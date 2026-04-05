import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata = {
  title: 'Πολιτική Απορρήτου - Resin',
  description: 'Πολιτική απορρήτου και προστασίας προσωπικών δεδομένων.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <LegalPageLayout title="Πολιτική Απορρήτου" lastUpdated="Απρίλιος 2026">
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          1. Συλλογή Δεδομένων
        </h2>
        <p>
          Συλλέγουμε μόνο τα απαραίτητα προσωπικά δεδομένα για την ολοκλήρωση των παραγγελιών σας:
          ονοματεπώνυμο, διεύθυνση αποστολής, email, τηλέφωνο. Τα δεδομένα πληρωμής επεξεργάζονται
          αποκλειστικά από τον πάροχο πληρωμών (Stripe) και δεν αποθηκεύονται στους δικούς μας servers.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          2. Χρήση Δεδομένων
        </h2>
        <p>Τα προσωπικά σας δεδομένα χρησιμοποιούνται αποκλειστικά για:</p>
        <ul style={{ paddingLeft: '24px', marginTop: '8px', marginBottom: '8px' }}>
          <li>Επεξεργασία και αποστολή παραγγελιών</li>
          <li>Επικοινωνία σχετικά με την παραγγελία σας</li>
          <li>Αποστολή newsletter (εφόσον έχετε εγγραφεί)</li>
          <li>Βελτίωση της εμπειρίας στο κατάστημά μας</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          3. Cookies
        </h2>
        <p>
          Χρησιμοποιούμε cookies για τη λειτουργία του καλαθιού αγορών, την αποθήκευση προτιμήσεων
          και τη βελτίωση της εμπειρίας πλοήγησης. Μπορείτε να διαχειριστείτε τις ρυθμίσεις cookies
          μέσω του banner που εμφανίζεται κατά την πρώτη επίσκεψη.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          4. Δικαιώματά σας (GDPR)
        </h2>
        <p>Σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR), έχετε δικαίωμα:</p>
        <ul style={{ paddingLeft: '24px', marginTop: '8px', marginBottom: '8px' }}>
          <li>Πρόσβασης στα δεδομένα σας</li>
          <li>Διόρθωσης ανακριβών δεδομένων</li>
          <li>Διαγραφής των δεδομένων σας</li>
          <li>Φορητότητας δεδομένων</li>
          <li>Ανάκλησης συγκατάθεσης</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          5. Ασφάλεια
        </h2>
        <p>
          Λαμβάνουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των δεδομένων σας.
          Η επικοινωνία με τον ιστότοπό μας είναι κρυπτογραφημένη μέσω SSL/TLS.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          6. Επικοινωνία
        </h2>
        <p>
          Για ερωτήσεις σχετικά με τα προσωπικά σας δεδομένα, επικοινωνήστε μαζί μας μέσω της{' '}
          <a href="/contact" style={{ color: '#214A4F', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            σελίδας επικοινωνίας
          </a>.
        </p>
      </LegalPageLayout>
      <Footer />
    </main>
  );
}
