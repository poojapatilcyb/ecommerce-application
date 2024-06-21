// debounce.ts

import { Observable, Subscriber, Subscription, timer } from 'rxjs';

export function debounceTime<T>(delay: number) {
  return (source: Observable<T>) =>
    new Observable<T>((observer: Subscriber<T>) => {
      let timeout: Subscription | null = null;

      return source.subscribe({
        next(value: T) {
          if (timeout) {
            timeout.unsubscribe();
          }
          timeout = timer(delay).subscribe(() => observer.next(value));
        },
        error(err) {
          if (timeout) {
            timeout.unsubscribe();
          }
          observer.error(err);
        },
        complete() {
          if (timeout) {
            timeout.unsubscribe();
          }
          observer.complete();
        }
      });
    });
}