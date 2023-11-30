import { Fragment } from 'react';
import { Transition, Dialog, Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

import './App.css';

Modal.propTypes = {
  newEntityOpen: PropTypes.bool.isRequired,
  setNewEntityOpen: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  entity: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  setEntities: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Modal({
  newEntityOpen,
  setNewEntityOpen,
  isEdit,
  formState,
  setFormState,
  entities,
  selected,
  setSelected,
  handleSubmit,
}) {
  return (
    <Transition.Root show={newEntityOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setNewEntityOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-visible rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <form className='bg-white'>
                  <div className='px-4 py-6 sm:p-8'>
                    <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='@id'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          @id
                        </label>
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='@id'
                            id='@id'
                            disabled={isEdit}
                            className={classNames(
                              isEdit ? 'bg-gray-100' : '',
                              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            )}
                            value={formState['@id']}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                '@id': e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='@type'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          @type
                        </label>
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='@type'
                            id='@type'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            value={formState['@type']}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                '@type': e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className='sm:col-span-4'>
                        <label
                          htmlFor='name'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Name
                        </label>
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='name'
                            id='name'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            value={formState.name}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className='col-span-full'>
                        <label
                          htmlFor='age'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Age
                        </label>
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='age'
                            id='age'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            value={formState.age}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                age: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <Combobox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <div className='col-span-full'>
                            <Combobox.Label className='block text-sm font-medium leading-6 text-gray-900'>
                              Friends with
                            </Combobox.Label>
                            <div className='relative mt-2'>
                              <Combobox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                                <span className='block truncate'>
                                  {selected?.name}
                                </span>
                                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                  <ChevronUpDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </span>
                              </Combobox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                              >
                                <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                  {entities.map((entity) => (
                                    <Combobox.Option
                                      key={entity['@id']}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-900',
                                          'relative cursor-default select-none py-2 pl-3 pr-9'
                                        )
                                      }
                                      value={entity}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className='flex items-center'>
                                            <span
                                              className={classNames(
                                                'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                                                (
                                                  Array.isArray(
                                                    formState.friends
                                                  )
                                                    ? formState.friends
                                                        .map((x) => x['@id'])
                                                        .includes(entity['@id'])
                                                    : formState.friends?.[
                                                        '@id'
                                                      ] === entity['@id']
                                                )
                                                  ? 'bg-green-400'
                                                  : 'bg-gray-200'
                                              )}
                                              aria-hidden='true'
                                            />

                                            <span
                                              className={classNames(
                                                'ml-3',
                                                selected
                                                  ? 'font-semibold'
                                                  : 'font-normal',
                                                'block truncate'
                                              )}
                                            >
                                              {entity.name}
                                            </span>
                                          </div>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? 'text-white'
                                                  : 'text-indigo-600',
                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                              )}
                                            >
                                              <CheckIcon
                                                className='h-5 w-5'
                                                aria-hidden='true'
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Combobox.Option>
                                  ))}
                                </Combobox.Options>
                              </Transition>
                            </div>
                          </div>
                        )}
                      </Combobox>
                    </div>
                  </div>
                  <div className='flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8'>
                    <button
                      type='button'
                      className='text-sm font-semibold leading-6 text-gray-900'
                      onClick={() => setNewEntityOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
