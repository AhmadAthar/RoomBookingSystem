
import { Observable, of } from 'rxjs';
import { HttpStatusCodeEnumerator } from 'shared/http-codes.enum';

interface ICustomError {
	code: number;
	message: string;
}

export class ApplicationCustomError extends Error {
	public constructor({ code, message }: ICustomError) {
		super();
		this.name = code.toString();
		this.message = message;
	}
}

export function CustomError(errorType: HttpStatusCodeEnumerator, message?: string): ApplicationCustomError {
	return new ApplicationCustomError({
		code: errorType,
		message: message ? message + ' ' + HttpStatusCodeEnumerator[errorType] : HttpStatusCodeEnumerator[errorType]
	});
}

export function CustomErrorObservable(errorType: HttpStatusCodeEnumerator, message?: string): Observable<ApplicationCustomError> {
	return of(
		new ApplicationCustomError({
			code: errorType,
			message: message ? message + ' ' + HttpStatusCodeEnumerator[errorType] : HttpStatusCodeEnumerator[errorType]
		})
	);
}

// our own rxjs operator to return error
export function CustomErrorOperator(errorType: HttpStatusCodeEnumerator, message?: string): () => Observable<ApplicationCustomError> {
	return function () {
		return of(CustomError(errorType, message));
	};
}