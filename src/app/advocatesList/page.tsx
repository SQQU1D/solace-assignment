'use client';

import { useState } from 'react';
import Link from 'next/link';

import Advocate from '@/components/advocate';
import { wait } from '@/utils/timer';
import { API_URL_PATH as ADVOCATES_API_URL, SEARCH_PARAM_KEY } from '@/api/advocates/data';

import {
  SEARCH_PLACEHOLDER,
  SEARCH_BUTTON_LABEL,
  HOME_BUTTON_LABEL,
  LOADING_LABEL,
  HAS_NOT_SEARCHED_LABEL,
  NO_RESULTS_LABEL,
  HEADER_LABEL,
} from './constants';
import { styles } from './styles';

export default function AdvocatesList() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const beginSearch = () => {
    setHasSearched(true);
    setIsLoading(true);
    setResults([]);
  };
  const finishSearch = () => {
    setQuery('');
    setIsLoading(false);
  };

  const handleSearch = async () => {
    const url = `${ADVOCATES_API_URL}?${SEARCH_PARAM_KEY}=${encodeURIComponent(query)}`;

    try {
      beginSearch();
      console.log('Showing off our stunning loading component');
      await wait(2000);
      const response = await fetch(url);
      const { data } = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    } finally {
      finishSearch();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleSearch();
  };

  const onChange = (e: any) => {
    setQuery(e.target.value);
  };

  const loading = () => {
    if (isLoading) {
      return (
        <div>
          <p style={styles.labelText}>{LOADING_LABEL}</p>
        </div>
      );
    }
  };

  const listResults = () => {
    if (!hasSearched) {
      return (
        <div>
          <p style={styles.labelText}>{HAS_NOT_SEARCHED_LABEL}</p>
        </div>
      );
    }
    const noResultsFound = !results || (!results.length && !isLoading);
    if (noResultsFound) {
      return (
        <div>
          <p style={styles.labelText}>{NO_RESULTS_LABEL}</p>
        </div>
      );
    }
    return (
      <div style={styles.resultListContainer}>
        {results.map((advocate: any, index: number) => {
          const { id } = advocate || {};
          const key = `advocate-${index}-${id}`;
          return <Advocate {...advocate} key={key} />;
        })}
      </div>
    );
  };

  const header = () => {
    return <h1 style={styles.headerText}>{HEADER_LABEL}</h1>;
  };

  const searchForm = () => {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e)}
          placeholder={SEARCH_PLACEHOLDER}
          style={styles.inputBox}
        />
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleSearch}
          className="px-4 py-2 bg-[#FFD700] text-black rounded-md shadow-sm disabled:bg-gray-400"
        >
          {SEARCH_BUTTON_LABEL}
        </button>
      </form>
    );
  };

  const returnHome = () => {
    return (
      <div style={styles.homeButtonContainer}>
        <Link key={'home'} href={'/'}>
          {HOME_BUTTON_LABEL}
        </Link>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {returnHome()}
      <div style={styles.innerContainer}>
        {header()}
        {searchForm()}
        {loading()}
        {listResults()}
      </div>
    </div>
  );
}
