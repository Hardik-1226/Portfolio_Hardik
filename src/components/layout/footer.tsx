export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {year} Hardik. All rights reserved.</p>
      </div>
    </footer>
  );
}
