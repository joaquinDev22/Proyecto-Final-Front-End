export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-black text-white py-3 text-center m-0">
      <p className="m-0 text-[0.9rem]">&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}