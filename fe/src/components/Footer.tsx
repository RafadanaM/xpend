import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-primary h-12">
      <Container className="h-full">
        <div className="flex items-center justify-center h-full">
          <span className="text-2xs text-white text-center font-medium">
            Copyright &copy; 2021 Xpend. All rights reserved.
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
