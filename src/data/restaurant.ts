/**
 * Restaurant details, taken from the existing site (dhanbad.momomiafood.com).
 * Edit values here to update every section of the website.
 */

const BASE_ORDER_URL = "https://dhanbad.momomiafood.com";

export const restaurant = {
  name: "Momomia",
  location: "Dhanbad",
  tagline: "Love In Every Bite",
  legalName: "Momomia Love In Every Bite",

  /** Verbatim "About Us" copy from the existing site. */
  about:
    "Our menu spotlights a delicious food collection of Chinese and regional Indian cuisine. Vegetarian Chinese, non-vegetarian Chinese, vegetarian Punjabi, Non-vegetarian Punjabi, and a wide range of mouth-watering items grace our menu all the time.",

  /** Address exactly as listed on the existing site. */
  addressLines: [
    "Renu Apartment, Senrelaigh Road, Kumarpur",
    "Ward No. 22, Asansol, WB-713305",
    "Dhanbad, Jharkhand, India",
  ],
  /** Text used for the embedded map and the Get Directions link. Edit if the pin needs adjusting. */
  mapQuery: "Renu Apartment, Senrelaigh Road, Kumarpur, Ward No. 22, Asansol, WB 713305",

  phoneDisplay: "+91 93340 38899",
  phoneHref: "tel:+919334038899",
  whatsappHref: "https://wa.me/919334038899",
  email: "arbindroy125@gmail.com",

  hours: [
    { day: "Sunday", open: "11:00 AM", close: "08:00 PM" },
    { day: "Monday", open: "11:00 AM", close: "08:00 PM" },
    { day: "Tuesday", open: "11:00 AM", close: "08:00 PM" },
    { day: "Wednesday", open: "11:00 AM", close: "08:00 PM" },
    { day: "Thursday", open: "11:00 AM", close: "08:00 PM" },
    { day: "Friday", open: "11:00 AM", close: "08:00 PM" },
    { day: "Saturday", open: "11:00 AM", close: "08:00 PM" },
  ],

  /** Existing online ordering (Recaho). */
  orderUrl: `${BASE_ORDER_URL}/order-menu/parcel`,
  dineInOrderUrl: `${BASE_ORDER_URL}/order-menu/dine-in`,

  /** No social media profiles were listed on the existing site. Add them here to show icons. */
  socials: [] as { label: string; href: string }[],
};

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(restaurant.mapQuery)}&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.mapQuery)}`;
