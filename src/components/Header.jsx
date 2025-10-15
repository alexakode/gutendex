import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppBar, Toolbar, Button, TextField, Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

// Style the RouterLink to look like a MUI Button
const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: "none",
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));
import styles from "./Header.module.css";

export default function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}&page=1`);
  };

  return (
    <AppBar className={styles.appBar} position="sticky" color="primary">
      <Toolbar>
        <div className={styles.toolbarStack}>
          <div className={styles.navBox}>
            <Link to="/" className={styles.navLink}>
              Hjem
            </Link>
            <Link to="/favorites" className={styles.navLink}>
              Favoritter
            </Link>
          </div>

          <form onSubmit={submit} className={styles.searchForm}>
            <TextField
              size="small"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Søk bøker..."
              fullWidth
              className={styles.searchField}
            />
            <Button type="submit" variant="contained" color="secondary">
              Søk
            </Button>
          </form>
        </div>
      </Toolbar>
    </AppBar>
  );
}
