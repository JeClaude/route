import ftl from "../assets/service-full-truckload.png";
import ltl from "../assets/service-ltl.png";
import refrigerated from "../assets/service-refrigerated.png";
import flatbed from "../assets/service-flatbed.png";
import specialized from "../assets/service-specialized.png";
import intermodal from "../assets/service-intermodal.png";
import expedited from "../assets/service-expedited.png";
import hazmat from "../assets/service-hazmat.png";
import fallback from "../assets/hero-truck.png";

const MAP = {
  "full-truckload": ftl,
  ftl: ftl,
  ltl: ltl,
  "less-than-truckload": ltl,
  refrigerated: refrigerated,
  reefer: refrigerated,
  flatbed: flatbed,
  specialized: specialized,
  intermodal: intermodal,
  expedited: expedited,
  hazmat: hazmat,
};

export function getServiceImage(slug) {
  return MAP[slug] || fallback;
}
