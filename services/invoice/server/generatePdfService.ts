import { NextRequest, NextResponse } from "next/server";
import chromium from "chrome-aws-lambda";
import { getInvoiceTemplate } from "@/lib/helpers";
import { CHROMIUM_EXECUTABLE_PATH, ENV, TAILWIND_CDN } from "@/lib/variables";
import { InvoiceType } from "@/types";
import puppeteerCore from "puppeteer-core";
export async function generatePdfService(req: NextRequest) {
	const body: InvoiceType = await req.json();
	let browser;
	let page;

	try {
		const ReactDOMServer = (await import("react-dom/server")).default;
		const templateId = body.details.pdfTemplate;
		const InvoiceTemplate = await getInvoiceTemplate(templateId);
		const htmlTemplate = ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(body));


		let launchOptions: any = {};

		if (ENV === "production") {
			console.log("Launching browser in production...");
			const executablePath = await chromium.executablePath;

			if (!executablePath) {
				throw new Error("Chromium executable path not found");
			}
			launchOptions = {
				args: chromium.args,
				executablePath,
				defaultViewport: chromium.defaultViewport,
				headless: chromium.headless,

			};
		} else {
			console.log("Launching browser in development...");

			launchOptions = {
				args: ["--no-sandbox", "--disable-setuid-sandbox"],
				headless: true,
			};
		}


		browser = await puppeteerCore.launch(launchOptions);
		if (!browser) throw new Error("Browser launch failed");

		page = await browser.newPage();
		await page.setContent(htmlTemplate, {
			waitUntil: ["networkidle0", "load", "domcontentloaded"],
			timeout: 30000,
		});

		await page.addStyleTag({ url: TAILWIND_CDN });

		const pdfBuffer = await page.pdf({
			format: "a4",
			printBackground: true,
			preferCSSPageSize: true,
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
