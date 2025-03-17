import { test } from "@playwright/test"

test("Product Page Add To Basket", async ({ page }) => {
    await page.goto("localhost:2221")
    // await page.pause()

    const addToBasketButton = page.getByRole('button', { name: 'Add to Basket' }).first()
    await addToBasketButton.waitFor()
    await addToBasketButton.click()

})