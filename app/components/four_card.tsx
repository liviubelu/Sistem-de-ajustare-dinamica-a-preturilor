export default function Four_card() {
  return (
    <div className="bg-[rgb(196, 196, 196)] py-16 ">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 test-4xl font-semibold text-indigo-600">Bine ai venit la SneakerSale</h2>
        <p className="mx-auto max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-black sm:text-5xl">
          Tot ce ai nevoie pentru adidași de top
        </p>
        <div className="mt-10 grid gap-5 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Caseta 1 */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem] "></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)] p-8 bg-base-100 shadow-xl glass">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center text-center">
                SneakerSale este magazinul tău online de încredere pentru adidași bărbați și femei.  
                Oferim colecții variate, autentice și pentru toate stilurile.
              </p>

              {/* Recenzii */}
              <div className="mt-8 space-y-6 max-lg:text-center">

                <div>
                  <p className="font-semibold text-white">Maria I.</p>
                  <div className="rating rating-sm justify-center max-lg:justify-start text-yellow-400">
                    <input type="radio" name="rating1" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating1" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating1" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating1" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating1" className="mask mask-star bg-yellow-400" checked readOnly />
                  </div>
                  <p className="mt-1 text-white italic">
                    „Livrarea a fost rapidă, iar calitatea adidașilor este fantastică. Recomand cu drag!”  
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">Andrei M.</p>
                  <div className="rating rating-sm justify-center max-lg:justify-start text-yellow-400">
                    <input type="radio" name="rating2" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating2" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating2" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating2" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating2" className="mask mask-star bg-yellow-400" checked readOnly />
                  </div>
                  <p className="mt-1 text-white italic">
                    „Returul gratuit a fost extrem de simplu și rapid. Serviciu impecabil!”  
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">Ioana S.</p>
                  <div className="rating rating-sm justify-center max-lg:justify-start text-yellow-400">
                    <input type="radio" name="rating3" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating3" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating3" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating3" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating3" className="mask mask-star bg-yellow-400" checked readOnly />
                  </div>
                  <p className="mt-1 text-white italic">
                    „Selecția de modele este excelentă, iar site-ul ușor de navigat. Mă voi întoarce cu siguranță!”  
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">Radu P.</p>
                  <div className="rating rating-sm justify-center max-lg:justify-start text-yellow-400">
                    <input type="radio" name="rating4" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating4" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating4" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating4" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating4" className="mask mask-star bg-yellow-400" checked readOnly />
                  </div>
                  <p className="mt-1 text-white italic">
                    „Calitatea produselor și serviciul clienți au fost peste așteptări. Recomand cu încredere!”  
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">Elena V.</p>
                  <div className="rating rating-sm justify-center max-lg:justify-start text-yellow-400">
                    <input type="radio" name="rating5" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating5" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating5" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating5" className="mask mask-star bg-yellow-400" checked readOnly />
                    <input type="radio" name="rating5" className="mask mask-star bg-yellow-400" checked readOnly />
                  </div>
                  <p className="mt-1 text-white italic">
                    „Mă bucur că am descoperit Footshop! Livrarea rapidă și produsele excelente.”  
                  </p>
                </div>

              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>

          {/* Caseta 2 */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] p-8 items-center text-center bg-base-100 shadow-xl glass">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                Livrare gratuită în maxim 4 zile lucrătoare, direct la ușa ta, oriunde în țară.
              </p>
              <img
                src="/images/livrare.png"
                alt="Livrare gratuita"
                className="mt-12 w-64 h-auto object-contain"
              />
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>

          {/* Caseta 3 */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] p-8 items-center text-center bg-base-100 shadow-xl glass">
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                Retur gratuit și simplu în 14 zile. Fără bătăi de cap, fără costuri suplimentare.
              </p>
              <img
                src="/images/retur.png"
                alt="Retur gratuit"
                className="mt-16 w-56 h-auto object-contain"
              />
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>

          {/* Caseta 4 */}
<div className="relative lg:row-span-2">
  <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)] p-8 text-center bg-base-100 shadow-xl glass">
    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center mb-4">
      Noua colecție Nike: Air Max și Force 1 – modelele must-have ale sezonului.
    </p>
    <img
      src="/images/air-max-black-2.jpg"  // a doua poză din seria ta, în folderul public/images
      alt="Nike Force 1 - Varianta 2"
      className="w-full max-w-xs mx-auto rounded-lg object-contain mt-4"
    />
    <a
  href="http://localhost:3000/4"
  className="btn btn-primary mt-6 mx-auto block max-w-xs text-center flex items-center justify-center"
  style={{ height: '3rem' }} // înălțime fixă pentru centrare verticală
>
  Cumpără
</a>
    <img
      src="/images/air-force-1-07-black-white-2.jpg"  // a doua poză din seria ta, în folderul public/images
      alt="Nike Force 1 - Varianta 2"
      className="w-full max-w-xs mx-auto rounded-lg object-contain mt-4"
    />
    <a
  href="http://localhost:3000/7"
  className="btn btn-primary mt-6 mx-auto block max-w-xs text-center flex items-center justify-center"
  style={{ height: '3rem' }} // înălțime fixă pentru centrare verticală
>
  Cumpără
</a>
  </div>
  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
</div>

        </div>
      </div>
    </div>
  );
}
