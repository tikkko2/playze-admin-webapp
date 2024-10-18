import { Injectable, signal, computed, Signal } from '@angular/core';

export interface NavigationModel {
  icon: string;
  name: string;
  navigate: string;
  selected: boolean;
  hasSelectedChild?: boolean;
  children: NavigationModel[];
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _navigation = signal<NavigationModel[]>([
    {
      icon: 'news-icon',
      name: 'News',
      navigate: '',
      selected: false,
      children: [
        {
          icon: 'product',
          name: 'Products',
          navigate: '/products',
          selected: false,
          children: [],
        },
        {
          icon: 'billing',
          name: 'Billing',
          navigate: '/billing',
          selected: false,
          children: [],
        },
        {
          icon: 'invoice',
          name: 'Invoice',
          navigate: '/invoice',
          selected: false,
          children: [],
        },
      ],
    },
    {
      icon: 'news-icon',
      name: 'News 2',
      navigate: '',
      selected: false,
      children: [
        {
          icon: 'product',
          name: 'Products 2',
          navigate: '/products',
          selected: false,
          children: [],
        },
        {
          icon: 'billing',
          name: 'Billing 2',
          navigate: '/billing',
          selected: false,
          children: [],
        },
        {
          icon: 'invoice',
          name: 'Invoice 2',
          navigate: '/invoice',
          selected: false,
          children: [],
        },
      ],
    },
  ]);

  public readonly navigation = this._navigation.asReadonly();

  private _selectedItem = signal<NavigationModel | null>(null);

  public selectedItem: Signal<NavigationModel | null> = computed(() =>
    this._selectedItem()
  );

  selectItem(item: NavigationModel) {
    if (!item.children.length) {
      // Child item clicked
      const parent = this.findParent(this._navigation(), item);
      if (parent) {
        this.resetSelection(parent.children); // Reset all child selections in the same parent
        parent.hasSelectedChild = true; // Ensure parent stays open
      }
      item.selected = true; // Keep the child highlighted
    } else {
      // Parent item clicked
      this.resetSelection(this._navigation()); // Reset the entire navigation
      item.selected = !item.selected; // Toggle parent open/close
      item.hasSelectedChild = item.selected; // Keep track if a child is selected
    }

    this._navigation.set(this._navigation()); // Trigger navigation state change
  }

  private findParent(
    items: NavigationModel[],
    target: NavigationModel
  ): NavigationModel | null {
    for (const item of items) {
      if (item.children.includes(target)) {
        return item;
      } else if (item.children.length > 0) {
        const parent = this.findParent(item.children, target);
        if (parent) return parent;
      }
    }
    return null;
  }

  private resetSelection(items: NavigationModel[]) {
    for (const item of items) {
      item.selected = false;
      item.hasSelectedChild = false;
      if (item.children.length > 0) {
        this.resetSelection(item.children);
      }
    }
  }
}
