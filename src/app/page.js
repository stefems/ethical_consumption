'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Homescreen from "./homescreen/Homescreen";

export default function Home() {
  const [onHome, setOnHome] = useState(true);
  const [activeGame, setActiveGame] = useState(0);

  return (
    <main>
      <Homescreen />
      
    </main>
  );
}
