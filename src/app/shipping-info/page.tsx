import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata = {
  title: 'Αποστολή & Παράδοση - Resin',
  description: 'Πληροφορίες αποστολής, χρόνοι παράδοσης και κόστη μεταφοράς.',
};

export default function ShippingInfoPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <LegalPageLayout title="Αποστολή & Παράδοση" lastUpdated="Απρίλιος 2026">
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          Τρόποι Αποστολής
        </h2>

        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(33,74,79,0.15)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#214A4F', fontWeight: 600 }}>Τρόπος</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#214A4F', fontWeight: 600 }}>Κόστος</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#214A4F', fontWeight: 600 }}>Χρόνος</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(33,74,79,0.08)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <strong>Τυπική Αποστολή</strong><br />
                  <span style={{ fontSize: '13px', color: 'rgba(33,74,79,0.6)' }}>Παράδοση στην είσοδο του κτιρίου</span>
                </td>
                <td style={{ padding: '12px 16px' }}>45€<br /><span style={{ fontSize: '12px', color: '#006364' }}>Δωρεάν για παραγγελίες &gt;500€</span></td>
                <td style={{ padding: '12px 16px' }}>5-7 εργάσιμες</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(33,74,79,0.08)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <strong>Express Αποστολή</strong><br />
                  <span style={{ fontSize: '13px', color: 'rgba(33,74,79,0.6)' }}>Ταχεία παράδοση στην είσοδο</span>
                </td>
                <td style={{ padding: '12px 16px' }}>85€</td>
                <td style={{ padding: '12px 16px' }}>2-4 εργάσιμες</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(33,74,79,0.08)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <strong>Premium Παράδοση</strong><br />
                  <span style={{ fontSize: '13px', color: 'rgba(33,74,79,0.6)' }}>Παράδοση στον χώρο + τοποθέτηση + αφαίρεση συσκευασίας</span>
                </td>
                <td style={{ padding: '12px 16px' }}>150€</td>
                <td style={{ padding: '12px 16px' }}>5-10 εργάσιμες</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          Ζώνες Αποστολής
        </h2>
        <ul style={{ paddingLeft: '24px', marginTop: '8px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Αττική:</strong> 3-5 εργάσιμες ημέρες</li>
          <li style={{ marginBottom: '8px' }}><strong>Ηπειρωτική Ελλάδα:</strong> 5-7 εργάσιμες ημέρες</li>
          <li style={{ marginBottom: '8px' }}><strong>Νησιά:</strong> 7-12 εργάσιμες ημέρες</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          Σημαντικές Πληροφορίες
        </h2>
        <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
          <li style={{ marginBottom: '8px' }}>Τα έπιπλα κατασκευάζονται κατά παραγγελία — ο χρόνος κατασκευής (2-4 εβδομάδες) προστίθεται στον χρόνο παράδοσης</li>
          <li style={{ marginBottom: '8px' }}>Θα ενημερωθείτε μέσω email και SMS για την πρόοδο της παραγγελίας σας</li>
          <li style={{ marginBottom: '8px' }}>Η παράδοση γίνεται σε συνεννόηση μαζί σας για ραντεβού</li>
          <li style={{ marginBottom: '8px' }}>Ελέγξτε το προϊόν κατά την παραλαβή παρουσία του μεταφορέα</li>
        </ul>
      </LegalPageLayout>
      <Footer />
    </main>
  );
}
