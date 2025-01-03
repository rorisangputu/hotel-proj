import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);
    
    //get the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();
    
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");
    
    await page.getByRole("button", { name: "Log In" }).click();
    
    await expect(page.getByText("Sign In Successful")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("New York")
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Hotels found in New York")).toBeVisible();
    await expect(page.getByText("Test Hotel Bellagio").nth(0)).toBeVisible();
});

test("should show hotel detail", async({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("New York")
    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Test Hotel Bellagio").nth(0).click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("New York")

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);

    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Test Hotel Bellagio").nth(0).click();
    await page.getByRole("button", { name: "Book Now" }).click();

    await expect(page.getByText("Total Cost: £300.00")).toBeVisible();
    
    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("047");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("04029");

    await page.getByRole("button", { name: "Confirm Booking" }).click();
    await expect(page.getByText("Booking saved!")).toBeVisible();

});