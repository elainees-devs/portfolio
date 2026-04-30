-- =========================================
-- PROJECTS
-- =========================================

INSERT INTO "Project" (
  "id",
  "title",
  "description",
  "tech",
  "github",
  "link",
  "category",
  "order"
)
VALUES
(
  'proj_1',
  'Portfolio Website',
  'A modern developer portfolio built with Next.js and Tailwind CSS.',
  '["Next.js","TypeScript","Tailwind"]',
  'https://github.com/example/portfolio',
  'https://portfolio.example.com',
  'Frontend',
  1
),
(
  'proj_2',
  'Ecommerce Platform',
  'Full-stack ecommerce application with cart, checkout, and admin dashboard.',
  '["React","Node.js","PostgreSQL"]',
  'https://github.com/example/ecommerce',
  NULL,
  'Fullstack',
  2
);

-- =========================================
-- PROJECT IMAGES (UPLOADTHING LINKS)
-- =========================================

INSERT INTO "ProjectImage" (
  "id",
  "url",
  "key",
  "projectId"
)
VALUES
(
  'img_1',
  'https://utfs.io/f/portfolio-website-home.png',
  'portfolio_home_key',
  'proj_1'
),
(
  'img_2',
  'https://utfs.io/f/portfolio-website-about.png',
  'portfolio_about_key',
  'proj_1'
),
(
  'img_3',
  'https://utfs.io/f/ecommerce-dashboard.png',
  'ecommerce_dashboard_key',
  'proj_2'
),
(
  'img_4',
  'https://utfs.io/f/ecommerce-product-page.png',
  'ecommerce_product_key',
  'proj_2'
);

-- =========================================
-- EXPERIENCE
-- =========================================

INSERT INTO "Experience" (
  "id",
  "title",
  "organization",
  "startDate",
  "endDate",
  "description",
  "order"
)
VALUES
(
  'exp_1',
  'Full Stack Developer',
  'Tech Company',
  '2023-01-01',
  '2024-01-01',
  '["Built scalable web applications","Improved API performance","Led frontend development"]',
  1
),
(
  'exp_2',
  'Frontend Developer',
  'Startup Inc',
  '2022-01-01',
  NULL,
  '["Developed UI components","Integrated REST APIs","Improved UX performance"]',
  2
);