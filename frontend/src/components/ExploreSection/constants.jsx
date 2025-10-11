import { FaHourglassHalf } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import cardImage1 from "../../assets/cardImage1.png";
import cardImage2 from "../../assets/cardImage2.png";
import cardImage3 from "../../assets/cardImage3.png";
import cardImage4 from "../../assets/cardImage4.png";
import cardImage5 from "../../assets/cardImage5.png";
import cardImage6 from "../../assets/cardImage6.png";

export const Card = [
  {
    id: 1,
    image: cardImage1,
    imageText: "Medical",
    title: "Medical Treatment for Sarah's Cancer Recovery",
    icon1: <CiUser />,
    name: "Sarah Johnson",
    Icon2: <FaHourglassHalf />,
    time: "23 days",
    timeText: "remaining",
    buttonText: "Donate now",
  },
  {
    id: 2,
    image: cardImage2,
    imageText: "Emergency",
    title: "Emergency Relief For Food victims",
    icon1: <CiUser />,
    name: "Disaster Relief Network",
    Icon2: <FaHourglassHalf />,
    time: "8 days",
    timeText: "remaining",
    buttonText: "Donate now",
  },
  {
    id: 3,
    image: cardImage3,
    imageText: "Education",
    title: "Education fund for Underprivileged Children",
    icon1: <CiUser />,
    name: "Hope Foundation",
    Icon2: <FaHourglassHalf />,
    time: "15 days",
    timeText: "remaining",
    buttonText: "Donate now",
  },
  {
    id: 4,
    image: cardImage4,
    imageText: "Amenities",
    title: "Clean Water Project for Remote Village",
    icon1: <CiUser />,
    name: "Water for all initiative",
    Icon2: <FaHourglassHalf />,
    time: "31 days",
    timeText: "remaining",
    buttonText: "Donate now",
  },
  {
    id: 5,
    image: cardImage5,
    imageText: "Green life",
    title: "Green Ecosystem Life Recovery After Fire",
    icon1: <CiUser />,
    name: "Eco Green",
    Icon2: <FaHourglassHalf />,
    time: "8 days",
    timeText: "remaining",
    buttonText: "Donate now",
  },
  {
    id: 6,
    image: cardImage6,
    imageText: "Nature",
    title: "Community Environment Clean up",
    icon1: <CiUser />,
    name: "Mother's Nature Group",
    Icon2: <FaHourglassHalf />,
    time: "12 days",
    timeText: "remaining",
    buttonText: "Donate now",
  },
];
