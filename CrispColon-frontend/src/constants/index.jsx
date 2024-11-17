import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Check", href: "/check" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Testimonials", href: "/#testimonial" },
];

export const testimonials = [
  {
    user: "Dr. Shivam Pandey",
    role: "Oncologist",
    image: user1,
    text: "CrispColon has revolutionized the way we approach early detection. The accuracy of their model gives me confidence in my recommendations to patients.",
  },
  {
    user: "Dr. Sidak Sodhi",
    role: "Gastroenterologist",
    image: user2,
    text: "The technology behind CrispColon is impressive. It empowers both patients and doctors to make informed decisions about colon health.",
  },
  {
    user: "Dr. Raghav Kukkar",
    role: "Healthcare Advocate",
    image: user3,
    text: "CrispColon is a game-changer in cancer detection. Their user-friendly platform makes it easy for individuals to take charge of their health.",
  },
  {
    user: "Rohit Kumar",
    role: "Patient",
    image: user4,
    text: "I can’t thank CrispColon enough for their support. The insights provided helped my family member get the care they needed when it mattered most.",
  },
  {
    user: "Dr. Nikita Agarwal",
    role: "Nutritionist",
    image: user5,
    text: "CrispColon combines cutting-edge technology with a compassionate approach. I wholeheartedly recommend it to anyone concerned about colon health.",
  },
  {
    user: "Simrat Kaur",
    role: "Patient",
    image: user6,
    text: "Thanks to CrispColon, my cancer was detected early. Their advanced technology played a crucial role in my successful treatment. I’m forever grateful!.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Early Colon Cancer Detection",
    description:
      "Leverage our advanced deep learning model to detect colon cancer at early stages, ensuring better chances for successful treatment.",
  },
  {
    icon: <Fingerprint />,
    text: "User-Friendly Interface",
    description:
      "Navigate our intuitive platform with ease, allowing users to quickly upload X-rays and receive predictions without hassle.",
  },
  {
    icon: <ShieldHalf />,
    text: "Secure Patient Data",
    description:
      "All patient information and X-ray uploads are securely stored, ensuring privacy and compliance with medical data regulations.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Predictions",
    description:
      "Get instant predictions after uploading an X-ray, providing users with immediate insights into their colon health.",
  },
  {
    icon: <PlugZap />,
    text: "Easy Collaboration",
    description:
      "Doctors, patients, and lab technicians can collaborate seamlessly by uploading and reviewing X-rays and predictions.",
  },
  {
    icon: <GlobeLock />,
    text: "Comprehensive Health Analytics",
    description:
      "Gain detailed insights into the predicted results and track patient health trends through the integrated analytics dashboard.",
  },
];


export const checklistItems = [
  {
    title: "Changes in Bowel Habits",
    description:
      "Look for persistent changes in your bowel habits, such as diarrhea, constipation, or a change in the consistency of your stool.",
  },
  {
    title: "Blood in Stool",
    description:
      "Be aware of any blood in your stool, which may appear bright red or dark and tarry.",
  },
  {
    title: "Abdominal Discomfort",
    description:
      "Pay attention to ongoing abdominal discomfort, such as cramps, gas, or pain.",
  },
  {
    title: "Unexplained Weight Loss",
    description:
      "Monitor for unexplained weight loss, which can be a sign of various health issues, including colon cancer.",
  },
  {
    title: "Fatigue",
    description:
      "Feelings of fatigue or weakness without an obvious cause may indicate an underlying issue.",
  },
];


export const pricingOptions = [
  {
    title: "Basic",
    price: "$0",
    features: [
      "1 screening per month",
      "Access to basic health resources",
      "Email support",
      "Community forums access",
    ],
  },
  {
    title: "Standard",
    price: "$29",
    features: [
      "3 screenings per month",
      "Access to detailed health reports",
      "Email and chat support",
      "Health tracking tools",
    ],
  },
  {
    title: "Premium",
    price: "$99",
    features: [
      "Unlimited screenings per month",
      "Comprehensive health analysis",
      "Priority support",
      "Access to exclusive webinars",
    ],
  },
];


export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Datasets" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Twitter" },
  { href: "#", text: "Jobs" },
];
