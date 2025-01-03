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

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel Bellagio");
    await page.locator('[name="city"]').fill("New York");
    await page.locator('[name="country"]').fill("United States");
    await page.locator('[name="description"]').fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    
    //Star Rating
    await page.selectOption('select[name="starRating"]', "3");
    
    //Type
    await page.getByText("Budget").click();
    
    //Check boxes
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Spa").check();

    //Guest
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("1");

    //Images upload
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "bellagio2.jpeg"),
        path.join(__dirname, "files", "bellagio1.jpeg"),
    ]);

    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel created successfully")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();

    await expect(page.getByText("Dublin Getaways")).toBeVisible();
    await expect(page.getByText("Lorem ipsum")).toBeVisible();
    await expect(page.getByText("Dublin, Ireland")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("R 119 / per night")).toBeVisible();
    await expect(page.getByText("2 adults, 3 children")).toBeVisible();
    await expect(page.getByText('Rating: 2')).toBeVisible();

    await expect(page.getByRole("link", { name: "View Details" }).nth(0)).toBeVisible();
})

test("should be able to edit hotel", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await page.getByRole("link", { name: "View Details" }).nth(1).click();

    await page.waitForSelector('[name="name"]', { state: "attached" });
    await expect(page.locator('[name="name"]')).toHaveValue('Dublin Getaways');
    await page.locator('[name="name"]').fill("Dublin Retreat");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Updated Hotel!")).toBeVisible();

})