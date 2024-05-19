import { AppBar, Container, Toolbar, MenuItem } from "@mui/material";
import Link from "next/link";
import { Text } from "@/components/base";

type Page = {
  label: string;
  href: string;
};

interface NavbarProps {
  pages: Page[];
}

const Navbar = ({ pages }: NavbarProps) => {
  return (
    <AppBar position="static">
      <Container maxWidth="sm">
        <Toolbar variant="dense" disableGutters>
          {pages.map((page) => (
            <MenuItem key={page.href}>
              <Link href={page.href} style={{ textDecoration: "none" }}>
                <Text
                  textAlign="center"
                  fontWeight="semiBold"
                  color="white"
                  letterSpacing={0.3}
                >
                  {page.label}
                </Text>
              </Link>
            </MenuItem>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Navbar };
export type { NavbarProps };
