// /src/app/lodging/[id]/page.js
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import styles from './lodgingDetail.module.css';
import BookingWidget from '../../../components/BookingWidget';
 // We will create this file

const prisma = new PrismaClient();

async function getLodging(id) {
  const lodging = await prisma.lodging.findUnique({
    where: {
      id: parseInt(id), // Convert the ID from the URL (string) to an integer
    },
  });
  return lodging;
}

export default async function LodgingDetailPage({ params }) {
  const lodging = await getLodging(params.id);

  if (!lodging) {
    return <p>Lodging not found.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={lodging.imageUrl}
          alt={lodging.name}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{lodging.name}</h1>
        <p className={styles.area}>{lodging.area}</p>
        <p className={styles.description}>{lodging.description}</p>
        
        <BookingWidget lodgingId={lodging.id} />
      </div>
    </div>
  );
}