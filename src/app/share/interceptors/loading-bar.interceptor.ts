import { catchError, finalize } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingBarService } from '../../services/loading-bar.service';

export const LoadingBarInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingBarService = new LoadingBarService();
  loadingBarService.controlProgressing(true);

  return next(req).pipe(
    finalize(() => {
      loadingBarService.controlProgressing(false);
    }),
    catchError(() => {
      loadingBarService.controlProgressing(false);
      throw 'Fail to handle the request';
    })
  );
};
