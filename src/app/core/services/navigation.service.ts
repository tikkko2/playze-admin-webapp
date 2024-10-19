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
      icon: 'dashboard-icon',
      name: 'Dashboard',
      navigate: '',
      selected: true,
      children: [],
    },
    {
      icon: 'news-icon',
      name: 'News',
      navigate: '',
      selected: false,
      children: [
        {
          icon: '',
          name: 'Announcements',
          navigate: '/products',
          selected: false,
          children: [],
        },
        {
          icon: '',
          name: 'Types',
          navigate: '/billing',
          selected: false,
          children: [],
        },
      ],
    },
  ]);

  public readonly navigation = this._navigation.asReadonly();

  private _selectedItem = signal<NavigationModel | null>(this._navigation()[0]);

  public selectedItem: Signal<NavigationModel | null> = computed(() =>
    this._selectedItem()
  );

  selectItem(item: NavigationModel) {
    if (!item.children.length) {
      const parent = this.findParent(this._navigation(), item);
      if (parent) {
        this._navigation().forEach((navItem) => {
          if (navItem !== parent) {
            navItem.selected = false;
          }
        });

        this.resetSelection(parent.children);
        parent.hasSelectedChild = true;
      }
      item.selected = true;
      this._selectedItem.set(item);

      this._navigation().forEach((navItem) => {
        if (navItem !== parent) {
          navItem.hasSelectedChild = false;
          this.resetSelection(navItem.children);
        }
      });
    } else {
      item.selected = !item.selected;
    }

    this._navigation.set(this._navigation());
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
