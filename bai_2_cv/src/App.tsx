import "./App.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Section from "./components/Section";

const SECTIONS = [
  {
    id: "about",
    title: "Giới thiệu",
    infoList: [
      ["Họ và tên", "Nguyễn Đức Thắng"],
      ["Mã sinh viên", "B25DCTV071"],
      ["Lớp", "D25CQTV01-B"],
      ["Ngành", "Trí tuệ nhân tạo Vạn vật (AIoT)"],
      ["Cơ sở đào tạo:", "Học viện Công nghệ Bưu chính Viễn thông (PTIT)"],
    ],
    imageSrc: "./src/assets/about.jpg",
    imageAlt: "About",
  },
  {
    id: "skills",
    title: "Kỹ năng",
    infoList: [
      ["C/C++", "Thông thạo"],
      ["Python", "Thông thạo"],
      ["HTML/CSS", "Thông thạo"],
      ["JavaScript/TypeScript", "Thông thạo"],
      ["React", "Cơ bản"],
    ],
    imageSrc: "./src/assets/skill.jpg",
    imageAlt: "Skills",
  },
  {
    id: "contact",
    title: "Liên hệ",
    infoList: [
      ["Email", "ducthangn71007@gmail.com"],
      ["Điện thoại", "034x xxx xxx"],
      ["GitHub", "@babiabeo"],
    ],
    imageSrc: "./src/assets/contact.jpg",
    imageAlt: "Contact",
  },
];

function getDaytime() {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 11) return "sáng";
  if (hours >= 11 && hours < 13) return "trưa";
  if (hours >= 13 && hours < 18) return "chiều";

  return "tối";
}

export default function App() {
  return (
    <>
      <Header sections={SECTIONS} />
      <main>
        <h1 className="greeting">Chào buổi {getDaytime()} &#x1F44B;</h1>

        {SECTIONS.map((sec) => (
          <Section key={`sec_${sec.id}`} {...sec} />
        ))}
      </main>
      <Footer />
    </>
  );
}
