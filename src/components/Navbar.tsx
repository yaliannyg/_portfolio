import type { CTALabels } from "@/lib/data";
import LogoImg from "@/assets/logo.png";
import { useTheme } from "@/context/useTheme";
import { usePostHog } from "@posthog/react";

interface NavbarProps {
  cvLink: string;
  logo: string;
  cta: CTALabels;
}

function Navbar({ cvLink, logo, cta }: NavbarProps) {
  const { theme, toggle } = useTheme();
  const posthog = usePostHog();

  function handleCvDownload() {
    posthog?.capture("cv_downloaded");
  }

  function handleThemeToggle() {
    posthog?.capture("theme_toggled", { theme_to: theme === "dark" ? "light" : "dark" });
    toggle();
  }

  const navbar = {
    links: [
      {
        href: "about",
        label: cta.Navigation.about,
      },
      {
        href: "skills",
        label: cta.Navigation.skills,
      },
      {
        href: "projects",
        label: cta.Navigation.work,
      },
      {
        href: "contact",
        label: cta.Navigation.contact,
      },
    ],
  };

  return (
    <nav className="fixed w-full flex items-center py-2 gap-2 bg-transparent backdrop-blur-lg rounded-full top-2 z-50 left-1/2 -translate-x-1/2 px-5">
      <div className="text-2xl font-bold tracking-wider text-on-muted hover:text-on-muted/50 flex justify-center items-center">
        <img src={LogoImg} alt="Logo Image" className="size-6" />
        <a href={`#`}>{logo}</a>
      </div>
      <ul className="flex mx-auto gap-2">
        {navbar.links.map(({ href, label }) => (
          <li
            className="text-sm text-on-surface leading-none hover:text-on-muted hover:bg-muted p-2 cursor-pointer rounded-full"
            key={href}
          >
            <a href={`#${href}`}>{label}</a>
          </li>
        ))}
      </ul>

    

      <div className="sm:flex gap-2 hidden">
        <a
          className="btn rounded-full text-sm text-on-muted leading-none bg-muted/30"
          href={cvLink}
          target="_blank"
          onClick={handleCvDownload}
        >
          {cta.Link.download_cv_btn}
        </a>
        <a
          className="btn rounded-full text-sm text-on-surface leading-none bg-muted"
          href="#contact"
        >
          {cta.Link.talk_btn}
        </a>
      </div>
        <button
        onClick={handleThemeToggle}
        className="p-2 rounded-full text-on-muted hover:bg-muted/30"
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>
    </nav>
  );
}

export default Navbar;
