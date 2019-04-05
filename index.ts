import { Request, Response } from "express";
import * as puppeteer from 'puppeteer';
import { Browser, Page } from "puppeteer";

export async function screenshot(_: Request, res: Response) {
  try {
    const browser = await puppeteer.launch({headless: true});
    const page = await configurePage(browser);
    await page.goto('http://www.example.com');  
    var screen = await page.screenshot();
      res.status(200)
      res.set('Content-Type', 'image/png');
      res.send(screen);
  } catch (err) {
      res.status(500)
      res.send(err)
  }
}

async function configurePage(browser: Browser): Promise<Page> {
  let defaultUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';
  const page = await browser.newPage();
  page.setUserAgent(defaultUserAgent)
  return page;
}