import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata = {
  title: 'Όροι Χρήσης - Resin',
  description: 'Όροι και προϋποθέσεις χρήσης του ηλεκτρονικού καταστήματος Resin.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <LegalPageLayout title="Όροι & Προϋποθέσεις" lastUpdated="Απρίλιος 2026">
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          1. Γενικοί Όροι
        </h2>
        <p>
          Η χρήση του ηλεκτρονικού καταστήματος <strong>resin.gr</strong> προϋποθέτει την ανεπιφύλακτη αποδοχή
          των παρόντων όρων. Η εταιρεία RESIN διατηρεί το δικαίωμα τροποποίησης των όρων αυτών χωρίς
          προηγούμενη ειδοποίηση.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          2. Παραγγελίες & Πληρωμές
        </h2>
        <p>
          Οι τιμές αναγράφονται σε Ευρώ (€) και συμπεριλαμβάνουν ΦΠΑ 24%. Η ολοκλήρωση παραγγελίας
          αποτελεί δεσμευτική σύμβαση αγοράς. Αποδεκτοί τρόποι πληρωμής: πιστωτική/χρεωστική κάρτα,
          τραπεζική κατάθεση, αντικαταβολή (με επιπλέον χρέωση 3€).
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          3. Αποστολή & Παράδοση
        </h2>
        <p>
          Οι χρόνοι παράδοσης ξεκινούν από την επιβεβαίωση της πληρωμής. Τα έπιπλα κατασκευάζονται
          κατά παραγγελία, γεγονός που μπορεί να επηρεάσει τους χρόνους παράδοσης. Δωρεάν αποστολή
          για παραγγελίες άνω των 500€ (τυπική αποστολή, ηπειρωτική Ελλάδα).
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          4. Πνευματική Ιδιοκτησία
        </h2>
        <p>
          Όλο το περιεχόμενο του ιστοτόπου (κείμενα, φωτογραφίες, σχέδια, λογότυπα) αποτελεί
          πνευματική ιδιοκτησία της RESIN και προστατεύεται από τους σχετικούς νόμους. Απαγορεύεται
          η αναπαραγωγή χωρίς γραπτή άδεια.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          5. Εφαρμοστέο Δίκαιο
        </h2>
        <p>
          Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο. Αρμόδια δικαστήρια για την επίλυση
          διαφορών είναι τα δικαστήρια Αθηνών.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#214A4F', marginBottom: '12px', marginTop: '32px' }}>
          6. Επικοινωνία
        </h2>
        <p>
          Για οποιαδήποτε απορία σχετικά με τους όρους χρήσης, επικοινωνήστε μαζί μας μέσω της{' '}
          <a href="/contact" style={{ color: '#214A4F', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            σελίδας επικοινωνίας
          </a>.
        </p>
      </LegalPageLayout>
      <Footer />
    </main>
  );
}
