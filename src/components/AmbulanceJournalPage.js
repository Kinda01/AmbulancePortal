// File: src/components/AmbulanceJournalPage.js
import { database } from '../firebase';
import { ref, set, push } from 'firebase/database';


// Function to update AmbulanceDetails and add to AmbulanceJournal
async function updateAmbulanceDetails(ambulanceId, location, status, driver) {
  const ambulanceDetailsRef = ref(database, 'AmbulanceDetails/' + ambulanceId);

  try {
    // Update AmbulanceDetails
    await set(ambulanceDetailsRef, {
      location,
      status,
      driver,
      lastUpdated: new Date().toISOString(),
    });

    // Add entry to AmbulanceJournal
    const ambulanceJournalRef = ref(database, 'AmbulanceJournal/' + ambulanceId);
    const newJournalEntryRef = push(ambulanceJournalRef);

    await set(newJournalEntryRef, {
      entryDate: new Date().toISOString(),
      details: `Updated ambulance ${ambulanceId}: Location ${location}, Status ${status}, Driver ${driver}.`,
    });

    console.log('Ambulance details updated and journal entry added.');
  } catch (error) {
    console.error('Error updating ambulance details:', error);
  }
}

export default updateAmbulanceDetails;
