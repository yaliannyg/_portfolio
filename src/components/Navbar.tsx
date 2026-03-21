interface NavbarProps {
  cvLink: string;
}

function Navbar({ cvLink }: NavbarProps) {
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
    <nav className="fixed top-2 flex justify-center w-screen z-50">
      <div className="flex items-center border-primary p-2 gap-2 bg-transparent backdrop-blur-xl rounded-full lg:w-full">
        <div className="text-white text-2xl font-bold pl-4">
          <a href={`#`}>YG</a>
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
            className="btn rounded-full text-sm text-variant leading-none"
            href="#contact"
          >
            Contact Me
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
