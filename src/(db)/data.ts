'use server';
import { prisma } from "@/(secrets)/secrets";


/*
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DIRECT_URL")
  directUrl = env("DIRECT_URL")
}

//جدول المستخدم
model User {
  id        String    @id @default(uuid()) @db.VarChar(36)
  email     String    @unique
  name      String?
  password  String
  role      String    @default("user")
  image     String?   @default("")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  //المنتجات التي تم بيعها
  contribution contribution[]
}

//طلب نسيت كلمة السر
model ResetPasswordRequest {
  id        String    @id @default(uuid()) @db.VarChar(36)
  token     String    @unique
  expires   DateTime
  userId    String    @db.VarChar(36)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
}

//طلب التاكد من المستخدم
model UserVerificationRequest {
  id        String    @id @default(uuid()) @db.VarChar(36)
  token     String    @unique
  expires   DateTime
  userId    String    @db.VarChar(36)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
}

// المنتج الاولي
model Matiere_Premiere {
  id         String   @id @default(uuid()) @db.VarChar(36)
  nom        String
  prix_achat Float
  quantite   Int
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

//المنتج النهائي
model Produit_Final {
  id         String       @id @default(uuid()) @db.VarChar(36)
  nom        String
  prix_vente Float
  quantite   Int
  created_at DateTime     @default(now())
  updated_at DateTime     @updatedAt
  Vente_logs Vente_logs[]
  produit_sell produit_sell[]
  logs Produit_Final_logs[]
  retorn_logs retorn_logs[]
}

//الموزع
model Vendur {
  id              String   @id @default(uuid()) @db.VarChar(36)
  nom             String
  le_prix_a_payer Float    @default(0) //المستحقات
  le_prix_a_paye  Float    @default(0) //المدفوعات
  frais_de_prix   Float    @default(0) //المصاريف
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt

  Vente_logs Vente_logs[]
  produit_sell produit_sell[]
  prix_a_paye prix_a_paye[]
  loss loss[]
  retorn_logs retorn_logs[]
}

//المنتج النهائي المباع
model Produit_Final_logs {
  id            String   @id @default(uuid()) @db.VarChar(36)
  stock_initial Int
  produit    Produit_Final @relation(fields: [produit_id], references: [id])
  produit_id String //المنتج
  production    Int
  ventes        Int
  retours       Int
  stock_final   Int
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
}

//جدول المبيعات
model Vente_logs {
  id         String        @id @default(uuid()) @db.VarChar(36)
  vendur     Vendur        @relation(fields: [vendur_id], references: [id])
  vendur_id  String // This field references the id of the Vendur model
  produit    Produit_Final @relation(fields: [produit_id], references: [id])
  produit_id String // This field references the id of the Produit_Final model
  quantite   Int //الكمية
  prix       Float //السعر
  created_at DateTime      @default(now())
  updated_at DateTime      @updatedAt
}

//المنتجات التي بيعت لكل موزع
model produit_sell {
  id         String   @id @default(uuid()) @db.VarChar(36)
  produit    Produit_Final @relation(fields: [produit_id], references: [id])
  produit_id String //المنتج
  vendur     Vendur @relation(fields: [vendur_id], references: [id])
  vendur_id  String //الموزع
  quantite   Int //الكمية  
  prix       Float //السعر
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

//جدول دفع المستحقات
model prix_a_paye {
  id         String   @id @default(uuid()) @db.VarChar(36)
  vendur     Vendur @relation(fields: [vendur_id], references: [id])
  vendur_id  String //الموزع
  type       String //النوع
  prix       Float //المبلغ
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

//جدول المصاريف لكل موزع
model frais_de_prix {
  id         String   @id @default(uuid()) @db.VarChar(36)
  vendur_id  String //الموزع
  prix       Float //المبلغ
  type       String //النوع
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

//الخسائر المترتة عن ارجاع المنتوج ناقصا
model loss {
  id         String   @id @default(uuid()) @db.VarChar(36)
  vendur     Vendur @relation(fields: [vendur_id], references: [id])
  vendur_id  String //الموزع
  prix       Float //المبلغ
  produit_id String //المنتج
  quantite   Int //الكمية
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

// 

model retorn_logs {
  id         String   @id @default(uuid()) @db.VarChar(36)
  vendur     Vendur @relation(fields: [vendur_id], references: [id])
  vendur_id  String //الموزع
  produit    Produit_Final @relation(fields: [produit_id], references: [id])
  produit_id String //المنتج
  quantite   Int //الكمية
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

model external_expense {
  id         String   @id @default(uuid()) @db.VarChar(36)
  prix       Float //المبلغ
  type       String //النوع
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

model contribution {
  id         String   @id @default(uuid()) @db.VarChar(36)
  prix       Float //المبلغ
  type       String  @default("contribution")
  user      User @relation(fields: [user_id], references: [id])
  user_id  String //المستخدم
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

model total_Selles {
  id         String   @id @default(uuid()) @db.VarChar(36)
  prix       Float //المبلغ
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

model total_expenses {
  id         String   @id @default(uuid()) @db.VarChar(36)
  prix       Float //المبلغ
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

*/

export const createExternalExpense = async (prix: number, type: string) => {
    try {
        const  result =await prisma.external_expense.create({
            data: {
                prix,
                type
            }
        });
       
        if (!result) {
            return {status :"error", message: "error in createExternalExpense"};
        }
        return {status :"success", message: "createExternalExpense success"};

    } catch (error) {
        console.log("error in createExternalExpense", error);
    }
    finally {
        await prisma.$disconnect();
    }
}

export const createContribution = async (prix: number, user_id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: user_id
            }
        });
        if (!user) {
            return {status :"error", message: "user not found"};
        }
        const  result =await prisma.contribution.create({
            data: {
                prix,
                user_id
            }
        });
       
        if (!result) {
            return {status :"error", message: "error in createContribution"};
        }
        return {status :"success", message: "createContribution success"};

    } catch (error) {
        console.log("error in createContribution", error);
    }
    finally {
        await prisma.$disconnect();
    }
}

export const getTotalSelles = async () => {
    try {
        // this is the total of all the selles for each vendur for this month 
        
    // find all the vendurs and the price of the selles - the price frais_de_prix  for this month
    const vendurs = await prisma.vendur.findMany();
    if (!vendurs) {
        return {status :"error", message: "vendurs not found"};
    }
    let total = 0;
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    for (let i = 0; i < vendurs.length; i++) {
        const vendur = vendurs[i];
        const selles = await prisma.produit_sell.findMany({
            where: {
                vendur_id: vendur.id,
                created_at: {
                    gte: new Date(year, month, 1),
                    lt: new Date(year, month + 1, 1)
                }
            }
        });
        if (!selles) {
            return {status :"error", message: "selles not found"};
        }
        for (let j = 0; j < selles.length; j++) {
            const sell = selles[j];
            total += sell.prix;
        }
        // find the frais_de_prix for this month
        const frais = await prisma.frais_de_prix.findMany({
            where: {
                vendur_id: vendur.id,
                created_at: {
                    gte: new Date(year, month, 1),
                    lt: new Date(year, month + 1, 1)
                }
            }
        });
        if (!frais) {
            return {status :"error", message: "frais not found"};
        }
        for (let j = 0; j < frais.length; j++) {
            const frai = frais[j];
            total -= frai.prix;
        }
        
    }
    const  result =await prisma.total_Selles.create({
        data: {
            prix: total
        }
    });
    

    } catch (error) {
        console.log("error in getTotalSelles", error);
    }
    finally {
        await prisma.$disconnect();
    }
}

