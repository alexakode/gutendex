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

export default function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}&page=1`);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          width="100%"
          py={1}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <NavLink to="/">Hjem</NavLink>
            <NavLink to="/favorites">Favoritter</NavLink>
          </Box>

          <Box
            component="form"
            onSubmit={submit}
            sx={{
              display: "flex",
              gap: 1,
              flexGrow: 1,
              maxWidth: "600px",
            }}
          >
            <TextField
              size="small"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Søk bøker..."
              fullWidth
              sx={{ bgcolor: "background.paper", borderRadius: 1 }}
            />
            <Button type="submit" variant="contained" color="secondary">
              Søk
            </Button>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
