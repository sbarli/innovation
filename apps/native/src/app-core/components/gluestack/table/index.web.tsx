import React, { createContext, useMemo, useContext, forwardRef } from 'react';

import {
  tableStyle,
  tableHeaderStyle,
  tableBodyStyle,
  tableFooterStyle,
  tableHeadStyle,
  tableRowStyleStyle,
  tableDataStyle,
  tableCaptionStyle,
} from './styles';

const TableHeaderContext = createContext<{
  isHeaderRow: boolean;
}>({
  isHeaderRow: false,
});
const TableFooterContext = createContext<{
  isFooterRow: boolean;
}>({
  isFooterRow: false,
});

const Table = forwardRef<HTMLTableElement, React.ComponentProps<'table'>>(function Table(
  { className, ...props },
  ref
) {
  return <table ref={ref} className={tableStyle({ class: className })} {...props} />;
});

const TableHeader = forwardRef<HTMLTableSectionElement, React.ComponentProps<'thead'>>(
  function TableHeader({ className, ...props }, ref) {
    const contextValue = useMemo(() => {
      return {
        isHeaderRow: true,
      };
    }, []);
    return (
      <TableHeaderContext.Provider value={contextValue}>
        <thead ref={ref} className={tableHeaderStyle({ class: className })} {...props} />
      </TableHeaderContext.Provider>
    );
  }
);

const TableBody = forwardRef<HTMLTableSectionElement, React.ComponentProps<'tbody'>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={tableBodyStyle({ class: className })} {...props} />;
  }
);

const TableFooter = forwardRef<HTMLTableSectionElement, React.ComponentProps<'tfoot'>>(
  function TableFooter({ className, ...props }, ref) {
    const contextValue = useMemo(() => {
      return {
        isFooterRow: true,
      };
    }, []);
    return (
      <TableFooterContext.Provider value={contextValue}>
        <tfoot ref={ref} className={tableFooterStyle({ class: className })} {...props} />
      </TableFooterContext.Provider>
    );
  }
);

const TableHead = forwardRef<HTMLTableCellElement, React.ComponentProps<'th'>>(function TableHead(
  { className, ...props },
  ref
) {
  return <th ref={ref} className={tableHeadStyle({ class: className })} {...props} />;
});

const TableRow = forwardRef<HTMLTableRowElement, React.ComponentProps<'tr'>>(function TableRow(
  { className, ...props },
  ref
) {
  const { isHeaderRow } = useContext(TableHeaderContext);
  const { isFooterRow } = useContext(TableFooterContext);
  return (
    <tr
      ref={ref}
      className={tableRowStyleStyle({
        isHeaderRow,
        isFooterRow,
        class: className,
      })}
      {...props}
    />
  );
});

const TableData = forwardRef<HTMLTableCellElement, React.ComponentProps<'td'>>(function TableData(
  { className, ...props },
  ref
) {
  return <td ref={ref} className={tableDataStyle({ class: className })} {...props} />;
});

const TableCaption = forwardRef<HTMLTableCaptionElement, React.ComponentProps<'caption'>>(
  function TableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={tableCaptionStyle({ class: className })} {...props} />;
  }
);

Table.displayName = 'Table';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableFooter.displayName = 'TableFooter';
TableHead.displayName = 'TableHead';
TableRow.displayName = 'TableRow';
TableData.displayName = 'TableData';
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableData, TableCaption };
