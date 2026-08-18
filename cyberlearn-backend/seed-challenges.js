/**
 * CyberLearn — Challenge Seed Script
 *
 * Migrates the original 12 static CTF challenges into MongoDB.
 * Safe to run multiple times — uses upsert on title to avoid duplicates.
 *
 * Usage:
 *   node seed-challenges.js
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Import the actual Challenge model (ensures we use the real schema)
import Challenge from './src/models/Challenge.js';

// ── The 12 original CyberLearn challenges ────────────────────
const CHALLENGES = [
  {
    title: "Base64 Basics",
    description: "Decode this message: dof_kpkua_p_ztpsl_ihjr",
    category: "Cryptography",
    difficulty: "Easy",
    points: 50,
    flag: "CyberLearn{why_didnt_i_smile_back}",
    hints: [
      { text: "The encoding shifts each letter by a fixed amount in the alphabet.", cost: 20 },
      { text: "Try a Caesar cipher decoder — the key is related to the word 'hack'.", cost: 40 }
    ],
    solutionExplanation: "The message uses a Caesar cipher with shift 7. 'dof_kpkua_p_ztpsl_ihjr' decodes to 'why_didnt_i_smile_back'."
  },
  {
    title: "Hidden in Plain Sight",
    description: "Analyze this satellite image and find the exact coordinates.",
    category: "OSINT",
    difficulty: "Easy",
    points: 100,
    flag: "CyberLearn{55.7963°N_49.1088°E}",
    imageUrl: "/ctf-images/satellite.jpg",
    hints: [
      { text: "Look at identifiable landmarks in the image.", cost: 20 },
      { text: "The coordinates belong to a city in Russia. Try reverse image search.", cost: 50 }
    ],
    solutionExplanation: "The satellite image shows Kazan, Russia. The exact coordinates are 55.7963°N, 49.1088°E."
  },
  {
    title: "Cipher Decode",
    description: "Decrypt the encoded message below to find the flag.",
    category: "Cryptography",
    difficulty: "Easy",
    points: 75,
    flag: "CyberLearn{S0meth1ng_1s_wr0ng}",
    cipherText: "L/rzkw.qx@.l@hm/qx",
    hints: [
      { text: "This is a substitution cipher — each character maps to another.", cost: 20 },
      { text: "Try Vigenere cipher with a common keyword.", cost: 45 }
    ],
    solutionExplanation: "The cipher text decodes to 'S0meth1ng_1s_wr0ng' using a Vigenere cipher."
  },
  {
    title: "OSINT Investigation",
    description: "The investigation begins at: emmatruthseeker.wordpress.com. Password: emmaseekstruth.",
    category: "OSINT",
    difficulty: "Medium",
    points: 125,
    flag: "CyberLearn{cityscape}",
    externalUrl: "https://emmatruthseeker.wordpress.com",
    hints: [
      { text: "Read through the blog posts carefully — the flag is hidden in the content.", cost: 20 },
      { text: "Look at image metadata or post content for the word that is the flag.", cost: 50 }
    ],
    solutionExplanation: "Navigating the blog and reading the posts reveals the flag: 'cityscape'."
  },
  {
    title: "Advanced Cryptography",
    description: "Decrypt the encoded message below to find the flag.",
    category: "Cryptography",
    difficulty: "Hard",
    points: 250,
    flag: "CyberLearn{can_you_hack_this}",
    cipherText: "FUXC2LRAFYWSALJOEAXC4LJNFYWSALJOFUWSALJNFUQC4LRNEAXC4LJNFYWSALROFYXCALRNEAWS4LJOEAWS4LJAFYXC2LJOFUQC2IBOFYXC4IBOFYQC4LRO",
    hints: [
      { text: "This uses a well-known modern cipher. Look for number/letter patterns.", cost: 30 },
      { text: "Try Base32 decoding as a first step.", cost: 75 }
    ],
    solutionExplanation: "The message is encoded with Base32 then a secondary cipher to produce 'can_you_hack_this'."
  },
  {
    title: "Password Cracking Challenge",
    description: "Download the secret file and crack its password to reveal the flag.",
    category: "Network Security",
    difficulty: "Hard",
    points: 300,
    flag: "CyberLearn{liberty}",
    attachments: [
      { name: "secret.zip", url: "/ctf-images/secret.zip", type: "file" }
    ],
    hints: [
      { text: "Try common wordlists like rockyou.txt with a ZIP cracker.", cost: 30 },
      { text: "The password is a common English word related to freedom.", cost: 80 }
    ],
    solutionExplanation: "Using a tool like fcrackzip or john with rockyou.txt reveals the password is 'liberty'. The ZIP contains the flag."
  },
  {
    title: "Social Media Investigation",
    description: "Find information about the target using social media platforms. The target's username is: @cyberlearn_target",
    category: "OSINT",
    difficulty: "Medium",
    points: 150,
    flag: "CyberLearn{digital_footprint}",
    hints: [
      { text: "Check multiple social media platforms for the target username.", cost: 25 },
      { text: "Look at the target's bio, posts, and linked accounts for clues.", cost: 55 }
    ],
    solutionExplanation: "Cross-referencing the target's social media presence reveals the phrase 'digital_footprint' in their bio."
  },
  {
    title: "Network Reconnaissance",
    description: "Perform network scanning to identify open ports and services on the target: scanme.nmap.org",
    category: "Reconnaissance",
    difficulty: "Medium",
    points: 200,
    flag: "CyberLearn{port_22_open}",
    hints: [
      { text: "Use nmap to scan the target host.", cost: 20 },
      { text: "Run: nmap -sV scanme.nmap.org and look at the open SSH port.", cost: 50 }
    ],
    solutionExplanation: "Running nmap on scanme.nmap.org reveals port 22 (SSH) is open. The flag references this finding."
  },
  {
    title: "Web Application Recon",
    description: "Gather information about the target web application. Target: http://testphp.vulnweb.com",
    category: "Reconnaissance",
    difficulty: "Easy",
    points: 175,
    flag: "CyberLearn{robots_txt_found}",
    hints: [
      { text: "Check the robots.txt file of the target website.", cost: 15 },
      { text: "Navigate to http://testphp.vulnweb.com/robots.txt", cost: 30 }
    ],
    solutionExplanation: "The robots.txt file at the target URL contains disallowed paths, revealing sensitive directories. The flag acknowledges this discovery."
  },
  {
    title: "DNS Enumeration",
    description: "Enumerate DNS records to find subdomains of: cyberlearn.example.com",
    category: "Reconnaissance",
    difficulty: "Easy",
    points: 125,
    flag: "CyberLearn{subdomain_discovered}",
    hints: [
      { text: "Use tools like dig, nslookup, or subfinder.", cost: 15 },
      { text: "Try: dig any cyberlearn.example.com or use a subdomain wordlist.", cost: 35 }
    ],
    solutionExplanation: "DNS enumeration techniques including zone transfers and brute-force reveal hidden subdomains."
  },
  {
    title: "WiFi Security Analysis",
    description: "Analyze WiFi security configurations. A WPA2 handshake capture has been simulated. Crack the weak password.",
    category: "Network Security",
    difficulty: "Medium",
    points: 225,
    flag: "CyberLearn{wpa2_cracked}",
    hints: [
      { text: "WPA2 passwords can be cracked with handshake captures and wordlists.", cost: 25 },
      { text: "Tools: hashcat or aircrack-ng with rockyou.txt wordlist.", cost: 60 }
    ],
    solutionExplanation: "Using aircrack-ng or hashcat against the WPA2 handshake with a common wordlist cracks the weak password, demonstrating the vulnerability."
  },
  {
    title: "Hash Cracking Challenge",
    description: "Crack the given hash to reveal the original password.\n\nHash: 5d41402abc4b2a76b9719d911017c592",
    category: "Cryptography",
    difficulty: "Medium",
    points: 180,
    flag: "CyberLearn{rainbow_tables}",
    hints: [
      { text: "Identify the hash type first. Count the characters.", cost: 20 },
      { text: "This is an MD5 hash. Try online rainbow tables or hashcat.", cost: 50 }
    ],
    solutionExplanation: "5d41402abc4b2a76b9719d911017c592 is the MD5 hash of 'hello'. This demonstrates why MD5 is insecure and rainbow tables are effective."
  }
];

async function seed() {
  console.log('🌱 CyberLearn Challenge Seed Script\n');

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    let created = 0;
    let skipped = 0;

    for (const challengeData of CHALLENGES) {
      const { flag, ...rest } = challengeData;

      // Check if already exists by title
      const existing = await Challenge.findOne({ title: rest.title });
      if (existing) {
        console.log(`  ⏭  Skipping (already exists): ${rest.title}`);
        skipped++;
        continue;
      }

      // Hash the flag before storing
      const flagHash = await Challenge.hashFlag(flag);

      await Challenge.create({
        ...rest,
        flagHash,
        isPublished: true
      });

      console.log(`  ✅ Created: ${rest.title} [${rest.difficulty}] — ${rest.points} pts`);
      created++;
    }

    console.log(`\n📊 Seed complete:`);
    console.log(`   Created : ${created}`);
    console.log(`   Skipped : ${skipped}`);
    console.log(`   Total   : ${created + skipped} / ${CHALLENGES.length}`);

    // Verify
    const total = await Challenge.countDocuments();
    const published = await Challenge.countDocuments({ isPublished: true });
    console.log(`\n📦 Database now contains ${total} challenges (${published} published)`);

  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

seed();
