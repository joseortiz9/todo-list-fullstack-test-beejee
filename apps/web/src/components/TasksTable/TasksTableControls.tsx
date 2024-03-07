import { type ChangeEvent } from 'react';

import { ArrowBackIcon, ArrowForwardIcon, Button, Flex, Select, Text } from '@/ui';

import { type OrderDirection, type TasksOrderBy } from '@/sharedTypes';

import { sortingDirectionItems, sortingItems } from '@/utils/filtersHelper';

type TasksTableControlsProps = {
  sortType?: TasksOrderBy;
  sortOrder?: OrderDirection;
  onChangeSortType: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeSortOrder: (event: ChangeEvent<HTMLSelectElement>) => void;
  currentPage?: number;
  totalPages?: number;
  onPrevPage?: () => void;
  onNextPage?: () => void;
};

export const TasksTableControls = ({
  sortType,
  sortOrder,
  onChangeSortOrder,
  onChangeSortType,
  onPrevPage,
  onNextPage,
  totalPages,
  currentPage,
}: TasksTableControlsProps) => {
  return (
    <Flex gap={4} alignItems="center">
      <Select placeholder="Sort By" value={sortType} onChange={onChangeSortType}>
        {sortingItems.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      <Select placeholder="Sort Order" value={sortOrder} onChange={onChangeSortOrder}>
        {sortingDirectionItems.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      <Flex gap={1}>
        <Button borderRadius="full" isDisabled={!onPrevPage} onClick={onPrevPage}>
          <ArrowBackIcon />
        </Button>
        <Button borderRadius="full" isDisabled={!onNextPage} onClick={onNextPage}>
          <ArrowForwardIcon />
        </Button>
      </Flex>
      {currentPage && totalPages && (
        <Text minW="max-content" pl={2} fontSize="sm">
          Page {currentPage} of {totalPages}
        </Text>
      )}
    </Flex>
  );
};
