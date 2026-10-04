const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer>
      <p>
        &copy; Copyright {CURRENT_YEAR} by Nguyễn Đức Thắng. All Rights
        Reserved.
      </p>
      <p>Made with React & TypeScript</p>
    </footer>
  );
}
