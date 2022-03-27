import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

// Hasura based download of all data and saving to JSON files
const getAdapterQuery = `query getAdapterQuery {
    adapter {
        channel
        config
        created_at
        id
        name
        provider
        updated_at
    }
}`;

const getBotQuery = `query getBotQuery {
    bot {
        created_at
        description
        endDate
        id
        logicIDs
        name
        ownerID
        ownerOrgID
        owners
        purpose
        startDate
        startingMessage
        status
        updated_at
        users
    }
}`;

const getCLQuery = `query getCLQuery {
    conversationLogic {
      adapter
      created_at
      description
      id
      name
      transformers
      updated_at
    }
}`;

const getServicesQuery = `query getServicesQuery {
    service {
      config
      created_at
      id
      name
      type
      updated_at
    }
}`;

const getTransformerQuery = `query getTransformerQuery {
    transformer {
        config
        created_at
        id
        name
        service_id
        tags
        updated_at
    }
}`;

const getUserSegmentQuery = `query getUserSegmentQuery {
    userSegment {
        all
        byID
        category
        byPhone
        count
        created_at
        description
        id
        name
    }
}`;

const queries = [
  getAdapterQuery,
  getBotQuery,
  getCLQuery,
  getServicesQuery,
  getTransformerQuery,
  getUserSegmentQuery,
];

// Download all data from Hasura.
// Save it to a file.
// Return the file path.
export default async function downloadData(hasuraURL, hasuraSecret, filePath) {
  const getDataFromHausraAndSaveAsFile = (query) => {
    return fetch(hasuraURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-hasura-admin-secret': hasuraSecret,
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((r) => r.json())
      .then(async (jsonData) => {
        try {
          // get filepath from query object name
          const fp = `${filePath}/${query.split(' ')[1].split('{')[0]}.json`;
          const absPath = path.resolve(fp);
          // save jsonData to absPath
          await fs.writeFileSync(absPath, JSON.stringify(jsonData));
          return true;
        } catch (e) {
          return false;
        }
      })
      .catch((e) => {
        console.error(
          'CP-downloadData-getDataFromHausraAndSaveAsFile',
          e,
          e.stack,
        );
        return false;
      });
  };

  try {
    const data = await Promise.all(
      queries.map((query) => getDataFromHausraAndSaveAsFile(query)),
    );
    // return true if all elements in data are true
    return data.every((e) => e);
  } catch (e) {
    console.error('CP-downloadData', e, e.stack);
    return false;
  }
}
