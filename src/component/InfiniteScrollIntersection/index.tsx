import { UseInfiniteQueryResult } from '@tanstack/react-query';
import React, {  useRef } from 'react';
import { useAsync, useIntersection } from 'react-use';


export default function InfiniteScrollIntersection(props: { queryResult: UseInfiniteQueryResult }) {
  const ref = useRef<HTMLDivElement>(null);
  const inter = useIntersection(ref, {
    threshold: 1
  });

  /*
   * 触发加载   isFetched是为了当第一页加载了ref还在页面中不继续执行的问题
   * */
  useAsync(async () => {
    if (inter && inter.intersectionRatio >= 1) {
      if (!props.queryResult.isFetching) {
        await props.queryResult.fetchNextPage();
      }
    }
    
  }, [inter?.intersectionRatio, props.queryResult.isFetched,props.queryResult.hasNextPage]);

  return (
    <div className={'grid h-16 place-items-center'} ref={ref}>
      123
      {/* 加载中 */}
      {props.queryResult.isFetching && <div>等待中...</div>}
      {/* 加载完毕 && 没有下一页 */}
      {!props.queryResult.isFetching && !props.queryResult.hasNextPage && (
        <div className={'text-center text-f3 text-text2'}>––– <div>暂无更多数据</div> –––</div>
      )}
    </div>
  );
}
