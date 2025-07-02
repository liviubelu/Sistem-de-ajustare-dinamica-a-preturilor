export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-100 shadow-xl glass text-neutral-content p-7">
      <aside>
        <img
          src="/images/Logo.png"
          alt="SneakerSale Logo"
          width={150}
          height={100}
        />
        <p>
          SneakerSale S.R.L
          <br />
          Vindem adidași din 2024
        </p>
      </aside>
    <div>
      <h6 className="footer-title">
        Sediu
      </h6>
      <p>
         Strada Plevnei, nr 7, Băicoi, Prahova, România
      </p></div>

      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="#">
            <img
              src="/images/instagram.png"
              alt="Instagram"
              width={70}
              height={70}
              className="hover:opacity-80 transition"
            />
          </a>
          <a href="#">
            <img
              src="/images/facebook.png"
              alt="Facebook"
              width={70}
              height={70}
              className="hover:opacity-80 transition"
            />
          </a>
          <a href="#">
            <img
              src="/images/youtube.png"
              alt="YouTube"
              width={70}
              height={70}
              className="hover:opacity-80 transition"
            />
          </a>
        </div>
      </nav>
    </footer>
  );
}
