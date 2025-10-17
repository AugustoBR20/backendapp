// seed.ts - popula banco com admin, times e jogador exemplo
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

// instancia do Prisma Client
const prisma = new PrismaClient();

async function main() {
  // senha do admin via env, fallback para "admin123"
  const adminPass = process.env.SEED_ADMIN_PASS || "admin123";
  const passwordHash = await bcrypt.hash(adminPass, 10);

  // cria ou garante admin (upsert evita duplicação)
  const admin = await prisma.user.upsert({
    where: { email: "admin@nba.local" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@nba.local",
      passwordHash,
      role: "ADMIN"
    }
  });

  // times iniciais (LAL e MIA)
  const lakers = await prisma.team.upsert({
    where: { name: "Los Angeles Lakers" },
    update: {},
    create: {
      name: "Los Angeles Lakers",
      logoUrl: "https://example.com/lakers-logo.png",
      conference: "Western",
      titles: 17
    }
  });

  const heat = await prisma.team.upsert({
    where: { name: "Miami Heat" },
    update: {},
    create: {
      name: "Miami Heat",
      logoUrl: "https://example.com/heat-logo.png",
      conference: "Eastern",
      titles: 3
    }
  });

  // jogador exemplo com stat
  const player = await prisma.player.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Exemplo Jogador",
      number: 0,
      position: "SG",
      teamId: lakers.id,
      stats: {
        create: {
          season: "2024-25",
          games: 10,
          points: 12.5,
          rebounds: 3.2,
          assists: 2.1
        }
      }
    }
  });

  console.log("✅ Seed completa:", { admin: admin.email, teams: [lakers.name, heat.name], player: player.name });
}

main()
  .catch(e => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
