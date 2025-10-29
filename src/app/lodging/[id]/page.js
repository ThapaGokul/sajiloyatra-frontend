// /src/app/lodging/[id]/page.js
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import styles from './lodgingDetail.module.css';
import BookingWidget from '../../../components/BookingWidget';
import PageHeader from '../../../components/PageHeader'; // <-- 1. IMPORT THE HEADER

const prisma = new PrismaClient();

async function getLodging(id) {
  const lodging = await prisma.lodging.findUnique({
    where: {
      id: parseInt(id),
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
    // We can use a simple <div> here, no specific class needed
    <div>
      {/* 2. ADD THE PAGE HEADER AT THE TOP */}
      <PageHeader
        imageUrl={lodging.imageUrl}
        title={lodging.name}
        description={lodging.area} // Use the area as the short description
      />

      {/* 3. THIS IS THE CONTENT BELOW THE HEADER */}
      <div className={styles.container}>
        {/* The image is now in the header, so we remove the old imageContainer */}
        
        {/* 4. CLEAN UP THE CONTENT DIV */}
        <div className={styles.mainContent}>
          <h2 className={styles.subTitle}>About {lodging.name}</h2>
          <p className={styles.description}>{lodging.description}</p>
        </div>

        <div className={styles.sidebar}>
          <BookingWidget lodgingId={lodging.id} />
        </div>
      </div>
    </div>
  );
}