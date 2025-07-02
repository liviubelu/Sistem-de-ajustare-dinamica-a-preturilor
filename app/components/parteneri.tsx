export default function Parteneri() {
  return (
    <div className="bg-[rgb(196, 196, 196)] py-12 sm:py-8">
      <div className="mx-auto max-w-4xl px-2 lg:px-2">
        <h2 className="text-center text-3xl font-bold text-black mb-4">
          Partenerii noștri
        </h2>
        <div className="mx-auto grid max-w-md grid-cols-4 items-center gap-x-12 gap-y-12 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 lg:mx-0 lg:max-w-none">
          <img
            alt="Adidas"
            src="/images/adidas_logo.png"
            width={220}
            height={70}
            className="col-span-1 w-full object-contain"
          />
          <img
            alt="Nike"
            src="/images/nike_logo.png"
            width={220}
            height={70}
            className="col-span-1 w-full object-contain"
          />
          <img
            alt="Puma"
            src="/images/puma_logo.png"
            width={220}
            height={70}
            className="col-span-1 w-full object-contain"
          />
          <img
            alt="New Balance"
            src="/images/new_balance_logo.png"
            width={220}
            height={70}
            className="col-span-1 w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
