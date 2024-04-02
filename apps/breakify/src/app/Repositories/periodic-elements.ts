import axios from 'axios'
import {PeriodicElement} from '../Documents/periodic-elements'

export class PeriodicElementsRepository {
  // Singleton Instance
  private static _instance: PeriodicElementsRepository

  static get instance(): PeriodicElementsRepository {
    if (!this._instance) {
      this._instance = new PeriodicElementsRepository()
    }
    return this._instance
  }

  public async getPeriodicElements(): Promise<Array<PeriodicElement>> {
    // Set url
    const url =
      'https://gist.githubusercontent.com/pedrozok/62b139da298533f94718ec8014c4fa38/raw/a751bcc21d59103eec11c7c2fbf16221f9351f2e/elements.json'

    // Get data
    const response = await axios.get<Array<PeriodicElement>>(url)

    // Return data
    return response.data
  }
}
