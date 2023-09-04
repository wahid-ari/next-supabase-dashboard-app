import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/design/layout');
});

test.describe('Testing Design Page', () => {
  test('page has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Layout/);
    await expect(page).toHaveURL(/layout/);
  });
  test('page has Heading', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page.getByRole('heading', { name: 'Layout', exact: true })).toBeVisible();
  });
  test('page has Table of Contents', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Table of Content' })).toBeVisible();
    await expect(page.locator('#tableofcontent').getByRole('link', { name: 'Breadcrumb' })).toBeVisible();
    await expect(page.locator('#tableofcontent').getByRole('link', { name: 'NavAccordion' })).toBeVisible();
    await expect(page.locator('#tableofcontent').getByRole('link', { name: 'NavLink', exact: true })).toBeVisible();
  });
});

test.describe('Testing Breadcrumb Component', () => {
  // BREADCRUMB ----------------------------------------------------
  test('renders a Breadcrumb component', async ({ page }) => {
    const breadcrumb = page.getByTestId('breadcrumb');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toHaveClass(
      /inline-flex flex-nowrap items-center space-x-1 whitespace-nowrap md:space-x-1/,
    );
    await expect(breadcrumb).toHaveText(/Home/);
    await expect(breadcrumb).toHaveText(/Design/);
    await expect(breadcrumb).toHaveText(/Layout/);
  });
});

test.describe('Testing NavAccordion Component', () => {
  // NAVACCORDION ----------------------------------------------------
  test('renders a NavAccordion component', async ({ page }) => {
    const navAccordion = page.getByTestId('nav-accordion');
    await expect(navAccordion).toBeVisible();
    await expect(navAccordion).toHaveClass(
      /flex w-full font-medium items-center justify-start gap-2 rounded py-1.5 pl-3 pr-2 text-neutral-600 outline-none transition-all/,
    );
    await expect(navAccordion).toHaveText(/Design/);
    const navAccordionLink = page.getByTestId('nav-accordion-link');
    await expect(navAccordionLink).toBeVisible();
    await expect(navAccordionLink).toHaveText(/Component/);
  });
  test('open and close NavAccordion component', async ({ page }) => {
    const navAccordion = page.getByTestId('nav-accordion');
    const navAccordionLink = page.getByTestId('nav-accordion-link');
    await expect(navAccordionLink).toBeVisible();
    await navAccordion.click();
    await expect(navAccordionLink).not.toBeVisible();
    await navAccordion.click();
    await expect(navAccordionLink).toBeVisible();
  });
});

test.describe('Testing NavLink Component', () => {
  // NAVLINK ----------------------------------------------------
  test('renders a NavLink component', async ({ page }) => {
    const navLink = page.getByTestId('nav-link');
    await expect(navLink).toBeVisible();
    await expect(navLink).toHaveClass(
      /flex w-full items-center font-medium justify-start gap-2 rounded px-3 py-1.5 text-sm transition-all/,
    );
    await expect(navLink).toHaveText(/Layout/);
    await expect(navLink).toHaveAttribute('href', '/design/layout');
  });
  test('renders a NavLink.logout component', async ({ page }) => {
    const navLink = page.getByTestId('nav-link-logout');
    await expect(navLink).toBeVisible();
    await expect(navLink).toHaveClass(/text-red-500 hover:text-red-600 dark:text-red-600 dark:hover:text-red-500/);
    await expect(navLink).toHaveText(/Logout/);
    await expect(navLink).toHaveAttribute('href', '/logout');
  });
});

test.describe('Testing ThemeChanger Component', () => {
  // THEMECHANGER ----------------------------------------------------
  test('renders a ThemeChanger component', async ({ page }) => {
    const themeChanger = page.getByTestId('theme-changer');
    await expect(themeChanger).toBeVisible();
    await expect(themeChanger).toHaveClass(
      /focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/,
    );
  });
  test('should change theme to dark / light', async ({ page }) => {
    const themeChanger = page.getByTestId('theme-changer');
    await themeChanger.click();
    await expect(page.getByTestId('theme-changer-value')).toHaveText('dark');
    await themeChanger.click();
    await expect(page.getByTestId('theme-changer-value')).toHaveText('light');
  });
});

test.describe('Testing Menu Component', () => {
  // MENU ----------------------------------------------------
  test('renders a Menu component', async ({ page }) => {
    const menu = page.getByTestId('menu');
    await expect(menu).toBeVisible();
    await expect(menu).toHaveClass(
      /inline-flex w-full items-center font-medium justify-center rounded text-neutral-600 hover:text-gray-900/,
    );
    await expect(menu).toHaveText('Menu');
  });
  test('should renders a Menu Item component', async ({ page }) => {
    await page.getByTestId('menu').click();
    await expect(page.getByText('SettingLogout')).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Setting' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
  });
});

test.describe('Testing Navbar Component', () => {
  // Navbar ----------------------------------------------------
  test('renders a Navbar component', async ({ page }) => {
    const navbar = page.getByTestId('navbar');
    await expect(navbar).toBeVisible();
    await expect(navbar).toHaveClass(/sticky top-0 z-40 h-11 dark:text-neutral-50 lg:hidden/);
    await expect(navbar).toHaveText(/MyBook/);
  });
});

test.describe('Testing Layout Component', () => {
  // Layout ----------------------------------------------------
  test('renders a Layout component', async ({ page }) => {
    const layout = page.getByTestId('layout');
    await expect(layout).toBeVisible();
    await expect(layout).toHaveClass(/min-h-screen w-full bg-white text-sm dark:bg-neutral-900 lg:grid/);
  });
});

test.describe('Testing Sidebar Component', () => {
  // Sidebar ----------------------------------------------------
  test('renders a Sidebar component', async ({ page }) => {
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar).toBeVisible();
    await expect(sidebar).toHaveClass(
      /z-50 h-screen max-h-screen w-screen flex-col flex-nowrap border-r bg-white dark:border-neutral-800 dark:bg-neutral-900/,
    );
    await expect(sidebar).toHaveText(/MyBook/);
  });
});

test.describe('Testing ErrorPage Component', () => {
  // ErrorPage ----------------------------------------------------
  test('renders a ErrorPage component', async ({ page }) => {
    const errorPage = page.getByTestId('error-page');
    await expect(errorPage).toBeVisible();
    await expect(errorPage).toHaveClass(/flex items-center justify-center/);
    await expect(errorPage).toHaveText(/500/);
    await expect(errorPage).toHaveText(/Server Error/);
  });
});

test.describe('Testing NotFoundPage Component', () => {
  // NotFoundPage ----------------------------------------------------
  test('renders a NotFoundPage component', async ({ page }) => {
    const notFoundPage = page.getByTestId('not-found-page');
    await expect(notFoundPage).toBeVisible();
    await expect(notFoundPage).toHaveClass(/flex items-center justify-center/);
    await expect(notFoundPage).toHaveText(/404/);
    await expect(notFoundPage).toHaveText(/Not Found/);
  });
});
