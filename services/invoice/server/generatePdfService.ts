import { NextRequest, NextResponse } from "next/server";


// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Variables
import { CHROMIUM_EXECUTABLE_PATH, ENV, TAILWIND_CDN } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";



import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req: NextRequest) {
	const body: InvoiceType = await req.json();

	let browser;
	let page;
	try {
		const ReactDOMServer = (await import("react-dom/server")).default;
		const templateId = body.details.pdfTemplate;
		const InvoiceTemplate = await getInvoiceTemplate(templateId);
		const htmlTemplate = ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(body));
		browser = await puppeteer.launch({
			executablePath: await chromium.executablePath(),
			args: chromium.args,
			headless: true,
			defaultViewport: chromium.defaultViewport
		});
		if (ENV === "production") {

		} else {
			// const puppeteer = await import("puppeteer");
			// browser = await puppeteer.launch({
			// 	args: ["--no-sandbox", "--disable-setuid-sandbox"],
			// 	headless: true,
			// });
		}



		page = await browser.newPage();
		await page.setContent(await htmlTemplate, {
			waitUntil: ["networkidle0", "load", "domcontentloaded"],
			timeout: 30000,
		});

		await page.addStyleTag({
			url: TAILWIND_CDN,
		});

		const pdfBuffer = await page.pdf({
			format: "a4",
			printBackground: true,
			preferCSSPageSize: true,
		});

		return new NextResponse(new Blob([pdfBuffer], { type: "application/pdf" }), {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": "attachment; filename=invoice.pdf",
				"Cache-Control": "no-cache",
				Pragma: "no-cache",
			},
			status: 200,
		});
	} catch (error) {
		console.error("PDF Generation Error:", error);
		return new NextResponse(JSON.stringify({ error: "Failed to generate PDF", details: error }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} finally {
		if (page) {
			try {
				await page.close();
			} catch (e) {
				console.error("Error closing page:", e);
			}
		}
		// if (browser) {
		// 	try {
		// 		const pages = await browser.pages();
		// 		await Promise.all(pages.map((p) => p.close()));
		// 		await browser.close();
		// 	} catch (e) {
		// 		console.error("Error closing browser:", e);
		// 	}
		// }
	}
}
