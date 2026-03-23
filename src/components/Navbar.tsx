interface NavbarProps {
  cvLink: string;
  logo: string;
}

function Navbar({ cvLink, logo }: NavbarProps) {
  const navbar = {
    links: [
      {
        href: "header",
        label: "About",
      },
      {
        href: "skills",
        label: "Skills",
      },
      {
        href: "work",
        label: "Projects",
      },
      {
        href: "contact",
        label: "Contact",
      },
    ],
  };

  return (
    <nav className="fixed w-full flex items-center py-2 gap-2 bg-transparent backdrop-blur-xl rounded-full top-2 z-50 left-1/2 -translate-x-1/2 px-5">
      <div className="text-2xl font-bold tracking-wider text-primary">
        <a href={`#`}>{logo}</a>
      </div>
      <ul className="flex mx-auto gap-2">
        {navbar.links.map(({ href, label }) => (
          <li
            className="text-sm text-gray-300 leading-none hover:text-primary hover:bg-variant/45 p-2 cursor-pointer rounded-full"
            key={href}
          >
            <a href={`#${href}`}>{label}</a>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <a
          className="btn rounded-full text-sm text-primary leading-none bg-primary/10"
          href={cvLink}
          target="_blank"
        >
          Download CV
        </a>
        <a
          className="btn rounded-full text-sm text-variant leading-none bg-primary"
          href="#contact"
        >
          Contact Me
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
