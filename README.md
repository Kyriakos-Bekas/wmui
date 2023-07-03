# Διεπαφή Χρήστη για Πλυντήριο Ρούχων

Η εργασία αυτή συντάχθηκε στα πλαίσια του μαθήματος **Αλληλεπίδραση Ανθρώπου-Υπολογιστή** του _Οικονομικού Πανεπιστημίου Αθηνών (ΟΠΑ)_ από τους φοιτητές

- [Σκουφούλας Ιωάννης](https://github.com/john-skoufoulas)
- [Σαχίνογλου Γεώργιος](https://github.com/george-sachinoglou)
- [Μπέκας Κυριάκος](https://github.com/Kyriakos-Bekas)

## Στόχος

Στόχος της διεπαφής είναι να διευκολύνει τους χρήστες των πλυντηρίων ρούχων, προσφέροντας τις παρακάτω λειτουργίες

- Δημιουργία Προσωποποιημένων Προγραμμάτων Πλύσεων (Personalized Program Creation)
- Γρήγορη Έναρξη Προγραμμάτων Πλύσεων (Quickstart)
- Χρονοπρογραμματισμός Πλύσεων (Washing Program Time Scheduling)
- Δυνατότητα Παύσης Πλύσης (Washing Program Pause)
- Δυνατότητα Ματαίωσης Πλύσης (Washing Program Abort)
- Προβολή χρόνου για την λήξη των Πλύσεων (Countdown to Washing Program Execution Finish)
- Ενημέρωση μέσω ειδοποιήσεων (Notifications)
- Παροχή Βοήθειας μέσω Video Tutorial (Help)

## Τεχνολογίες και Εργαλεία

Για την υλοποίηση αυτής της εφαρμογής, χρησιμοποιήθηκαν τα παρακάτω βασικά εργαλεία:

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

Για το hosting της εφαρμογής και της βάσης δεδομένων χρησιμοποιήθηκαν οι παρακάτω πλατφόρμες:

- [Vercel](https://vercel.com/)
- [PlanetScale](https://planetscale.com/)

## Χρήση

Μπορείτε να χρησιμοποιήσετε την εφαρμογή αν επισκεφτείτε το [**live** production environment](https://wmui.vercel.app/) ή αν την εγκαταστήσετε τοπικά.

### Τοπική Εγκατάσταση

#### Προαπαιτούμενα

##### System

Για να τρέξετε τις περισσότερες από τις εντολές που ακολουθούν, θα πρέπει να έχετε εγκατεστημένο το [NodeJS](https://nodejs.org/en) στο σύστημά σας.

Τρέξτε την παρακάτω εντολή για να δείτε αν έχετε εγκατεστημένη κάποια έκδοσή του. Αν ναι, μπορείτε να προχωρήσετε στα παρακάτω βήματα.

```bash
node -v
```

##### Environment

Για να μπορέσετε να αποθηκεύσετε και να ανακτήσετε δεδομένα, θα πρέπει να έχετε φτιάξει μια βάση δεδομένων τύπου **mysql** (προτεινόμενη πλατφόρμα: [PlanteScale](https://planetscale.com/)).

Για την σύνδεση στη βάση, χρησιμοποιείτε το URL που θα σας δώσει η πλατφόρμα, το οποίο θα πρέπει να βρίσκεται σε ένα αρχείο `.env` στο _root directory_ του project.

```
# .env file contents
DATABASE_URL='XXXXXXXXXXXXXXXX'
```

#### Dependency Installation

Εγκαταστήστε τα dependencies της εφαρμογής με την εντολή

```bash
npm install
```

#### Run project in Development mode

Μπορείτε να ξεκινήσετε την εφαρμογή σε _development mode_, με την εντολή

```bash
npm run dev
```

Η εφαρμογή είναι διαθέσιμη στην διεύθυνση [http://localhost:3000/](http://localhost:3000/).

#### Build and Run the project

Μπορείτε να χτίσετε την εφαρμογή με την εντολή

```bash
npm run build
```

Για να χρησιμοποιήσετε την 'χτισμένη' εφαρμογή, τρέξτε την εντολή

```bash
npm run start
```

Η εφαρμογή είναι διαθέσιμη για χρήση στην διεύθυνση [http://localhost:3000/](http://localhost:3000/).
