import { NextRequest, NextResponse } from "next/server";
import { getInvoiceTemplate } from "@/lib/helpers";
import { TAILWIND_CDN } from "@/lib/variables";
import { InvoiceType } from "@/types";
import puppeteer from 'puppeteer-core';
import chromium from "@sparticuz/chromium";

export const runtime = 'nodejs';

export async function generatePdfService(req: NextRequest) {
	const body: InvoiceType = await req.json();
	let browser;
	let page;

	try {
		const ReactDOMServer = (await import("react-dom/server")).default;
		const templateId = body.details.pdfTemplate;
		const InvoiceTemplate = await getInvoiceTemplate(templateId);
		const htmlTemplate = ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(body));

		// Configure launch options for Vercel
		const launchOptions = {
			args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath(),
			headless: true,
			ignoreHTTPSErrors: true,
		};

		browser = await puppeteer.launch(launchOptions);
		if (!browser) throw new Error("Browser launch failed");

		page = await browser.newPage();

		// Set content with increased timeout
		await page.setContent(htmlTemplate, {
			waitUntil: ["networkidle0", "load", "domcontentloaded"],
			timeout: 60000, // Increased timeout
		});

		// Add Tailwind CSS
		await page.addStyleTag({ url: TAILWIND_CDN });

		// Generate PDF with specific options
		const pdfBuffer = await page.pdf({
			format: "a4",
			printBackground: true,
			preferCSSPageSize: true,
			margin: {
				top: '20px',
				right: '20px',
				bottom: '20px',
				left: '20px'
			}
		});

		return new NextResponse(new Blob([pdfBuffer], { type: "application/pdf" }), {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": "attachment; filename=invoice.pdf",
				"Cache-Control": "no-cache",
				Pragma: "no-cache",
			},
		});
	} catch (error) {
		console.error("PDF Generation Error:", error);
		return new NextResponse(
			JSON.stringify({ error: "Failed to generate PDF", details: error }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} finally {
		if (page) {
			try {
				await page.close();
			} catch (e) {
				console.error("Error closing page:", e);
			}
		}
		if (browser) {
			try {
				await browser.close();
			} catch (e) {
				console.error("Error closing browser:", e);
			}
		}
	}
}
