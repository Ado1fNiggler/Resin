import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata = {
  title: 'Πολιτική Επιστροφών - Resin',
  description: 'Πληροφορίες για επιστροφές και ανταλλαγές προϊόντων.',
};

export default function ReturnsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <LegalPageLayout title="Επιστροφές & Ανταλλαγές" lastUpdated="Απρίλιος 2026">
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          Δικαίωμα Υπαναχώρησης (14 ημέρες)
        </h2>
        <p>
          Σύμφωνα με την ευρωπαϊκή νομοθεσία, έχετε δικαίωμα υπαναχώρησης εντός 14 ημερολογιακών ημερών
          από την παραλαβή του προϊόντος, χωρίς να χρειάζεται να αναφέρετε λόγο. Το προϊόν πρέπει να
          επιστραφεί στην αρχική του κατάσταση, αχρησιμοποίητο, με όλες τις ετικέτες και τη συσκευασία.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          Εξαιρέσεις
        </h2>
        <p>Δεν γίνονται δεκτές επιστροφές για:</p>
        <ul style={{ paddingLeft: '24px', marginTop: '8px', marginBottom: '8px' }}>
          <li>Προϊόντα κατασκευασμένα κατόπιν ειδικής παραγγελίας (custom orders)</li>
          <li>Προϊόντα που έχουν χρησιμοποιηθεί ή φέρουν φθορές</li>
          <li>Προϊόντα χωρίς την αρχική συσκευασία τους</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          Διαδικασία Επιστροφής
        </h2>
        <ol style={{ paddingLeft: '24px', marginTop: '8px', marginBottom: '8px' }}>
          <li style={{ marginBottom: '8px' }}>Επικοινωνήστε μαζί μας μέσω email ή τηλεφώνου εντός 14 ημερών από την παραλαβή</li>
          <li style={{ marginBottom: '8px' }}>Θα λάβετε οδηγίες και ετικέτα επιστροφής</li>
          <li style={{ marginBottom: '8px' }}>Συσκευάστε το προϊόν με ασφάλεια στην αρχική συσκευασία</li>
          <li style={{ marginBottom: '8px' }}>Η επιστροφή χρημάτων γίνεται εντός 14 ημερών από την παραλαβή του επιστρεφόμενου προϊόντος</li>
        </ol>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          Κόστος Επιστροφής
        </h2>
        <p>
          Σε περίπτωση υπαναχώρησης, τα έξοδα επιστροφής βαρύνουν τον αγοραστή. Σε περίπτωση ελαττωματικού
          προϊόντος, η RESIN αναλαμβάνει πλήρως τα έξοδα μεταφοράς.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          Ελαττωματικά Προϊόντα
        </h2>
        <p>
          Εάν λάβετε ελαττωματικό ή κατεστραμμένο προϊόν, επικοινωνήστε μαζί μας εντός 48 ωρών
          από την παραλαβή. Θα σας αποστείλουμε αντικατάσταση χωρίς επιπλέον κόστος.
        </p>
      </LegalPageLayout>
      <Footer />
    </main>
  );
}
