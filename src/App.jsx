import { useEffect, useState, useCallback } from 'react';

import axios from 'axios';
import './App.css';
import { Table } from './Table';
import { Modal } from './Modal';
import { Header } from './Header';

const apiKey = import.meta.env.VITE_API_KEY;
const ledger = import.meta.env.VITE_LEDGER;

function generateQueryBody(ledger) {
  return {
    from: ledger,
    where: {
      '@id': '?s',
      name: '?name',
    },
    select: {
      '?s': ['@id', '@type', 'name', 'age', { friends: ['@id', 'name'] }],
    },
  };
}

function generateTransactionBody(ledger, insertObj, deleteObj = null) {
  const transaction = {
    ledger,
    insert: insertObj,
  };
  if (deleteObj) {
    transaction.delete = deleteObj;
  }
  return transaction;
}

function issueQuery(queryBody, apiKey) {
  return axios.post('https://data.flur.ee/fluree/query', queryBody, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
  });
}

function App() {
  const [entities, setEntities] = useState([]);
  const [newEntityOpen, setNewEntityOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formState, setFormState] = useState({
    '@id': '',
    '@type': '',
    name: '',
    age: '',
    friends: [],
  });

  const refreshData = useCallback(
    () =>
      issueQuery(generateQueryBody(ledger), apiKey)
        .then((response) => {
          setEntities(response.data);
          setSelected(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        }),
    [setEntities, setSelected]
  );

  useEffect(() => {
    if (entities.length > 0) return;
    refreshData();
  }, [entities, refreshData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentFriendIds = [];
    if (formState.friends) {
      currentFriendIds = Array.isArray(formState.friends)
        ? formState.friends.map((x) => x['@id'])
        : [formState.friends?.['@id']];
    }
    const newFriendId = selected['@id'];
    if (!currentFriendIds.includes(newFriendId)) {
      currentFriendIds.push(newFriendId);
    }
    formState.friends = currentFriendIds.map((x) => ({ '@id': x }));
    const previousEntity = entities.find((x) => x['@id'] === formState['@id']);
    let deleteObj = null;
    if (previousEntity) {
      if (previousEntity.friends) {
        previousEntity.friends = Array.isArray(previousEntity.friends)
          ? previousEntity.friends.map((x) => x['@id'])
          : [previousEntity?.friends?.['@id']];
      }
      deleteObj = previousEntity;
    }
    const transaction = generateTransactionBody(ledger, formState, deleteObj);
    return axios
      .post('https://data.flur.ee/fluree/transact', transaction, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiKey,
        },
      })
      .then(() => {
        setNewEntityOpen(false);
        setFormState({
          '@id': '',
          '@type': '',
          name: '',
          age: '',
          friends: [],
        });
      })
      .then(() => refreshData());
  };

  const handleEdit = (entity) => {
    setIsEdit(true);
    setFormState(entity);
    setNewEntityOpen(true);
  };
  return (
    <>
      <div className='min-h-full'>
        <Header />
        <div className='py-10'>
          <main>
            <Table
              {...{
                setNewEntityOpen,
                setFormState,
                setIsEdit,
                entities,
                handleEdit,
              }}
            />
          </main>
        </div>
      </div>
      <Modal
        {...{
          newEntityOpen,
          setNewEntityOpen,
          isEdit,
          formState,
          setFormState,
          entities,
          selected,
          setSelected,
          handleSubmit,
        }}
      />
    </>
  );
}

export default App;
