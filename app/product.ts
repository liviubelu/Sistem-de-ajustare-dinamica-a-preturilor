import { StaticImageData } from "next/image";
import photo1 from "../public/images/adidas-campus.webp"
import photo1_2 from "../public/images/adidas-campus2.webp"
import photo1_3 from "../public/images/adidas-campus3.webp"
import photo1_4 from "../public/images/adidas-campus4.webp"
import photo2 from "../public/images/adidas-samba-og-w.webp"
import photo2_2 from "../public/images/adidas-samba-og-w-2.webp"
import photo2_3 from "../public/images/adidas-samba-og-w-3.webp"
import photo2_4 from "../public/images/adidas-samba-og-w-4.webp"
import photo3_2 from "../public/images/adidas-whitworth-spezial-2.webp"
import photo3_3 from "../public/images/adidas-whitworth-spezial-3.webp"
import photo3_4 from "../public/images/adidas-whitworth-spezial-4.webp"
import photo3 from "../public/images/adidas-whitworth-spezial.webp"
import photo4 from "../public/images/nike-air-force-1-07.webp"
import photo4_2 from "../public/images/nike-air-force-1-07-2.webp"
import photo4_3 from "../public/images/nike-air-force-1-07-3.webp"
import photo4_4 from "../public/images/nike-air-force-1-07-4.webp"
import photo5 from "../public/images/adidas-campus-00-green.webp"


export type ProductImage = {
    id:string;
    name:string;
    src:StaticImageData;
    src2:StaticImageData;
    src3:StaticImageData;
    src4:StaticImageData;
    pret:string;
    descriere:string;
};

const productsImages: ProductImage[] = [
    { id: "1", name: "Adidas Campus 00s",src: photo1, src2:photo1_2, src3:photo1_3, src4:photo1_4, descriere: "Această versiune a adidas Campus se bazează pe estetica anilor '50, care a fost foarte mult în tendințe în ultima vreme, mai ales sub hashtag-ul #Y2K. Schimbarea față de varianta originală, ușor mai curată, sunt șireturile mai late și un aspect general mai voluminos, care se potrivește cu aproape orice skateboard. Și fie pentru skatepark sau pentru uzura de zi cu zi, adidas Campus 00s va fi o alegere excelentă pentru tine, la un preț bun.", pret: "619 RON"},
    { id: "2", name: "Adidas Samba OG-W", src: photo2, src2:photo2_2, src3:photo2_3, src4:photo2_4, descriere: "Cu mult timp înainte ca încălțămintea adidas Samba să pășească pe străzi, ea și-a lăsat amprenta pe terenul de fotbal în sală. Partea superioară din piele netedă, vârful din nubuck și talpa din cauciuc întărită au fost concepute având în minte agilitatea și controlul. Deși vremurile s-au schimbat, esența lor rămâne aceeași. Astăzi, ele continuă moștenirea ca un stil stradal iconic, pregătite pentru orice îți aduce ziua. Încorporată în designul lor este decenii de istorie, menținând spiritul trifoiului viu.", pret: "560 RON"},
    { id: "3", name: "Adidas Whitworth Spezial", src: photo3, src2:photo3_2, src3:photo3_3, src4:photo3_4, descriere: "Construiti pentru oraș, acesti adidași joși sunt pregătiți pentru aventură. Partea superioară durabilă din piele de catifea, plasă și nailon rezistă cerințelor vieții urbane, în timp ce căptușeala textilă menține picioarele confortabile în plimbari lungi prin oraș. Indiferent dacă te duci la serviciu sau te întâlnești cu prietenii seara, talpa exterioară din cauciuc oferă aderență esențială pentru a ajunge acolo unde trebuie să ajungi.", pret: "586 RON"},
    { id: "4", name: "Nike Air Force 1 '07", src: photo4, src2:photo4_2, src3:photo4_3, src4:photo4_4, descriere: "Adidasi denumiti dupa numele avionului presedintelui Statelor Unite ale Americii, sunt unii dintre cei mai populari si vanduti adidasi din toate timpurile. AF1 vin intr-o gama variata de culori, pe gustul fiecaruia.", pret: "576 RON"}

];

export default productsImages;