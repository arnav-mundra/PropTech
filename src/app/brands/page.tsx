import styles from './page.module.css';
import { prisma } from '@/lib/prisma';
import { mockBrands, mockRequirements, mockUnits } from '@/lib/mockData';
import RequirementsClient from './RequirementsClient';

async function getBrandsData() {
  try {
    const brands = await prisma.brand.findMany();
    const reqs = await prisma.requirement.findMany({ include: { brand: true } });
    const availableUnits = await prisma.unit.findMany({ where: { status: 'Available' } });
    return { brands, reqs, availableUnits };
  } catch (error) {
    return { brands: mockBrands, reqs: mockRequirements, availableUnits: mockUnits.filter(u => u.status === 'Available') };
  }
}

export default async function BrandsPage() {
  const { brands, reqs, availableUnits } = await getBrandsData();

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>Brand Intelligence Database</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Category</th>
              <th>Typical Size</th>
              <th>Pref. City Tier</th>
              <th>Locations</th>
              <th>Expansion</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand: any) => (
              <tr key={brand.id}>
                <td style={{fontWeight: 600}}>{brand.name}</td>
                <td>{brand.category}</td>
                <td>{brand.typicalSize}</td>
                <td>{brand.preferredCityTier}</td>
                <td>{brand.existingLocations}</td>
                <td><span style={{color: brand.expansionStatus === 'Active' ? '#10b981' : 'inherit'}}>{brand.expansionStatus}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>Expansion Requirements & Space Matcher</div>
        <RequirementsClient requirements={reqs} availableUnits={availableUnits} />
      </div>
    </div>
  );
}
